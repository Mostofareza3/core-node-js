import net from "net";
import readline from "readline/promises";
import fs from "fs";
import path from "path";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const clearLine = (dir) => {
    return new Promise((resolve, reject) => {
        process.stdout.clearLine(dir, () => {
            resolve()
        })
    })
}

const moveCursor = (dx, dy) => {
    return new Promise((resolve, reject) => {
        process.stdout.moveCursor(dx, dy, () => {
            resolve()
        })
    })
}

let id;
let username;
let typing = false;
let activeFileTransfer = null;

// Setup typing detection only once to avoid memory leaks
process.stdin.setMaxListeners(20); // Increase max listeners to avoid warning

process.stdin.on("data", (chunk) => {
    if (!typing && username) {
        typing = true;
        socket.write(`${username}-typing-start`);
    }

    // stop typing if no key is pressed for 2s
    clearTimeout(globalThis._typingTimeout);
    globalThis._typingTimeout = setTimeout(() => {
        typing = false;
        if (username) {
            socket.write(`${username}-typing-end`);
        }
    }, 2000);
});

const socket = net.createConnection(
    { port: 3333, host: "127.0.0.1" },
    async () => {

        // ask for message from user
        const ask = async () => {
            const message = await rl.question("Enter a message:>> ");
            if(message.startsWith("/send-file")){
                // Format: /send-file username filepath
                const parts = message.split(" ");
                if (parts.length < 3) {
                    console.log("Usage: /send-file <username> <filepath>");
                    ask();
                    return;
                }
                
                const targetUsername = parts[1];
                const filePath = parts.slice(2).join(" ");
                
                try {
                    // Check if file exists
                    const stats = fs.statSync(filePath);
                    if (!stats.isFile()) {
                        console.log("Not a file or file doesn't exist.");
                        ask();
                        return;
                    }
                    
                    const fileName = path.basename(filePath);
                    const fileSize = stats.size;
                    
                    // Start file transfer protocol
                    socket.write(`file-transfer-start:${targetUsername}:${fileName}:${fileSize}`);
                    
                    // Store the file path for when we get the ready signal
                    activeFileTransfer = {
                        filePath: filePath,
                        fileName: fileName,
                        fileSize: fileSize,
                        targetUser: targetUsername
                    };
                    
                    console.log(`Initiating file transfer of ${fileName} (${fileSize} bytes) to ${targetUsername}...`);
                    // success message
                    console.log("File transfer initiated successfully!");
                } catch (err) {
                    console.error("Error accessing file:", err.message);
                    ask();
                }
            } 
            else if(message.startsWith("@")){
                // private message
                const targetUsername = message.split(" ")[0].substring(1);
                const actualMessage = message.split(" ").slice(1).join(" ");
                socket.write(`${username}-private-${targetUsername}-${actualMessage}`);
                ask();
            } else{
                socket.write(`${username}-message-${message}`);
                ask();
            }
        };


        socket.on("data", async (data) => {
            const dataString = data.toString("utf-8").trim();
            
            // Handle file transfer responses
            if (dataString.startsWith("file-transfer-ready")) {
                const transferId = dataString.split(":")[1];
                
                if (activeFileTransfer) {
                    console.log(`Starting file transfer with ID: ${transferId}`);
                    socket.write(`file-transfer-data:${transferId}`);
                }
                return;
            }
            
            if (dataString === "ready-for-binary" && activeFileTransfer) {
                // Send the file in chunks
                const fileStream = fs.createReadStream(activeFileTransfer.filePath);
                
                fileStream.on('data', (chunk) => {
                    const canContinue = socket.write(chunk);
                    if (!canContinue) {
                        fileStream.pause();
                        socket.once('drain', () => {
                            fileStream.resume();
                        });
                    }
                });
                
                fileStream.on('end', () => {
                    console.log("File data sent completely!");
                    activeFileTransfer = null;
                    ask();
                });
                
                fileStream.on('error', (err) => {
                    console.error("Error reading file:", err.message);
                    socket.write(`file-transfer-cancel:${transferId}`);
                    activeFileTransfer = null;
                    ask();
                });
                
                return;
            }
            
            if (dataString === "set-username"){
                username = await rl.question("Enter your username: ");
                socket.write(`username:${username}`);
                return;  
            }
            else if (dataString.substring(0, 2) === "id") {
                id = dataString.substring(3)
                console.log(`your id is ${id}!\n`)
            } else {
                // when getting message
                //empty line
                console.log()
                // move cursor one line up
                await moveCursor(0, -1)
                // clear line
                await clearLine(0)
                // Only print if the message is not empty
                const message = dataString;
                if (message.trim() !== "") {
                    console.log(message)
                    if (!message.includes("is typing")) {
                        console.log("===========")
                    }
                }
            }

            ask()
        })
    }
);


socket.on("end", () => {
    console.log("Connection was ended!");
});

socket.on("error", (err) => {
    console.error("Socket error:", err.message);
    process.exit(1);
});