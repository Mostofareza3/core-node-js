import net from "net";

// array of client socket
const clients = []

const server = net.createServer((socket) => {
    console.log("A new connectioin to the server")

    socket.on("data", (data) => {
        clients.map((client) => {
            client.write(data)
        })
    })
    clients.push(socket)
})

server.listen(3333, "127.0.0.1", () => {
    console.log("Opened server on:", server.address())
})
