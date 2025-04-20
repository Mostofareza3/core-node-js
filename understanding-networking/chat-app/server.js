import net from "net";


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

    // clients.map((client) => {
    //     client.socket.write(`User ${clientId} joined!`)
    // })


    // socket.write(`id-${clientId}`)


    socket.on("data", (data) => {
        const dataString = data.toString("utf-8").trim();
        if (dataString.startsWith("username")) {
            const username = dataString.split(':')[1]
            clientData.username = username;

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
                client.socket.write(`> User ${id}: ${message}`);
            });
        } else if (dataString.includes("-private-")) {
            const [id, , targetId, ...rest] = dataString.split("-");
            const message = rest.join("-");
            const targetClient = clients.find((c) => c.id === targetId);

            if (targetClient) {
                targetClient.socket.write(`[Private] User ${id}: ${message}`);
            }
        }

        else if (dataString.includes("-typing-start")) {
            const id = dataString.split("-")[0];
            clients.forEach((client) => {
                if (client.id !== id) {
                    client.socket.write(`User ${id} is typing...`);
                }
            });
        } else if (dataString.includes("-typing-end")) {
            const id = dataString.split("-")[0];
            clients.forEach((client) => {
                if (client.id !== id) {
                    client.socket.write("");
                }
            });
        }
    });

    socket.on('end', () => {
        clients.map((client) => {
            client.socket.write(`User ${client.username} left!`)
        })
    })

    clients.push(clientData)
})

server.listen(3333, "127.0.0.1", () => {
    console.log("Opened server on:", server.address())
})
