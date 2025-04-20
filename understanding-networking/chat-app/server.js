import net from "net";
import fs from "fs/promises"
import path from "path";


var __dirname = "/Users/mostofareza/Desktop/Personal/core-node-js/understanding-networking/chat-app"
async function makeDirectory(name) {
    const projectFolder = path.join(__dirname, "files", name);
    const dirCreation = await fs.mkdir(projectFolder, { recursive: true });
    return dirCreation;
}


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
        clients.map((client) => {
            client.socket.write(`User ${client.username} left!`)
            // remove the corresponding user file
            fs.rmdir(`${__dirname}/files/${client.username}`)
        })
    })

    clients.push(clientData)
})

server.listen(3333, "127.0.0.1", () => {
    console.log("Opened server on:", server.address())
})
