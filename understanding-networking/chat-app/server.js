import net from "net";
import fs from "fs/promises"
import path from "path";
import { createWriteStream } from "fs";

var __dirname = "/Users/mostofareza/Desktop/Personal/core-node-js/understanding-networking/chat-app"
async function makeDirectory(name) {
    const projectFolder = path.join(__dirname, "files", name);
    const dirCreation = await fs.mkdir(projectFolder, { recursive: true });
    return dirCreation;
}

// File transfer states
const fileTransfers = new Map();

const server = net.createServer()
// array of client socket
const clients = []

server.on("connection", (socket) => {
    console.log("New client connected!");
    socket.write("set-username")

    const clientData = {
        id: clients.length + 1,
        socket,
        username: null
    };


    socket.on("data", (data) => {
        const dataString = data.toString("utf-8").trim();
        if (dataString.startsWith("username")) {
            const username = dataString.split(':')[1]
            clientData.username = username;
            makeDirectory(username)

            socket.write(`Welcome ${username}!\n`);
            clients.forEach(c => {
                if (c.socket !== socket && c.username)
                    c.socket.write(`${username} has joined!\n`);
            });
            return;
        }
        // check if username set
        if (!clientData.username) {
            socket.write("Please set your username first.\n");
            return;
        }
        
        // File transfer handling
        if (dataString.startsWith("file-transfer-start")) {
            // Format: file-transfer-start:targetUsername:fileName:fileSize
            const [_, targetUsername, fileName, fileSize] = dataString.split(":");
            const targetClient = clients.find(c => c.username === targetUsername);
            
            if (!targetClient) {
                socket.write(`User ${targetUsername} not found or not online.\n`);
                return;
            }
            
            const transferId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
            const filePath = path.join(__dirname, "files", targetUsername, fileName);
            
            fileTransfers.set(transferId, {
                sender: clientData.username,
                receiver: targetUsername,
                fileName: fileName,
                filePath: filePath,
                fileSize: parseInt(fileSize),
                bytesReceived: 0,
                writeStream: createWriteStream(filePath)
            });
            
            socket.write(`file-transfer-ready:${transferId}\n`);
            targetClient.socket.write(`${clientData.username} is sending you a file: ${fileName}\n`);
            
            return;
        }
        
        if (dataString.startsWith("file-transfer-data")) {
            // Format: file-transfer-data:transferId
            const [_, transferId] = dataString.split(":");
            const transfer = fileTransfers.get(transferId);
            
            if (!transfer) {
                socket.write(`Invalid file transfer ID.\n`);
                return;
            }
            
            // Set socket to binary mode for receiving file data
            socket.pause();
            socket.transferId = transferId;
            socket.isReceivingFile = true;
            socket.write(`ready-for-binary\n`);
            socket.resume(); // Resume the socket to receive binary data
            
            return;
        }
        
        if (socket.isReceivingFile && socket.transferId) {
            const transfer = fileTransfers.get(socket.transferId);
            if (transfer) {
                transfer.bytesReceived += data.length;
                
                // Write to file with back-pressure handling
                const canContinue = transfer.writeStream.write(data);
                if (!canContinue) {
                    socket.pause();
                    transfer.writeStream.once('drain', () => {
                        socket.resume();
                    });
                }
                
                // Check if file transfer is complete
                if (transfer.bytesReceived >= transfer.fileSize) {
                    transfer.writeStream.end();
                    fileTransfers.delete(socket.transferId);
                    socket.isReceivingFile = false;
                    socket.transferId = null;
                    
                    socket.write(`File transfer completed.\n`);
                    
                    const targetClient = clients.find(c => c.username === transfer.receiver);
                    if (targetClient) {
                        targetClient.socket.write(`File received from ${transfer.sender}: ${transfer.fileName}\n`);
                    }
                }
                return;
            }
        }
        
        if (dataString.startsWith("file-transfer-cancel")) {
            const [_, transferId] = dataString.split(":");
            const transfer = fileTransfers.get(transferId);
            
            if (transfer) {
                transfer.writeStream.end();
                fileTransfers.delete(transferId);
                
                const targetClient = clients.find(c => c.username === transfer.receiver);
                if (targetClient) {
                    targetClient.socket.write(`File transfer from ${transfer.sender} was cancelled.\n`);
                }
                
                socket.write(`File transfer cancelled.\n`);
            }
            
            return;
        }
        
        if (dataString.includes("-message-")) {
            const id = dataString.split("-")[0];
            const message = dataString.split("-message-")[1];
            clients.forEach((client) => {
                if (client.socket === socket) {
                    client.socket.write(`me: ${message}`);
                } else {
                    client.socket.write(`${id}: ${message}`);
                }
            });
        } else if (dataString.includes("-private-")) {
            const [sender, , targetUsername, ...rest] = dataString.split("-");
            const message = rest.join("-");
            const targetClient = clients.find((c) => c.username === targetUsername);

            if (targetClient) {
                targetClient.socket.write(`[Private] ${sender}: ${message}`);
                socket.write(`[Private to ${targetClient.username}]: ${message}`);
            } else {
                socket.write(`User ${targetUsername} not found or not online.`);
            }
        }
        else if (dataString.includes("-typing-start")) {
            const [sender, , targetUsername] = dataString.split("-");
            clients.forEach((client) => {
                if (client.socket !== socket) {
                    if (client.username === targetUsername && dataString.includes("-private-")) {
                        // private message
                        client.socket.write(`${sender} is typing...`);
                    } else {
                        // public message
                        client.socket.write(`${sender} is typing...`);
                    }
                }
            });
        } else if (dataString.includes("-typing-end")) {
            const id = dataString.split("-")[0];
            clients.forEach((client) => {
                if (client.socket !== socket) {
                    client.socket.write(``);
                }
            });
        }
    });

    socket.on('end', () => {
        // Clean up any file transfers
        for (const [transferId, transfer] of fileTransfers.entries()) {
            if (transfer.sender === clientData.username || transfer.receiver === clientData.username) {
                transfer.writeStream.end();
                fileTransfers.delete(transferId);
            }
        }
        
        clients.forEach((client) => {
            if (client.socket !== socket && clientData.username) {
                client.socket.write(`User ${clientData.username} left!`);
            }
        });
        
        // Remove client from the list
        const index = clients.findIndex(c => c.socket === socket);
        if (index !== -1) {
            const username = clients[index].username;
            if (username) {
                // Remove the corresponding user directory
                fs.rmdir(path.join(__dirname, "files", username), { recursive: true })
                    .catch(err => console.error(`Error removing directory: ${err}`));
            }
            clients.splice(index, 1);
        }
    })

    clients.push(clientData)
})

server.listen(3333, "127.0.0.1", () => {
    console.log("Opened server on:", server.address())
})
