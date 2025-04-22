import net from "net"
import fs from "fs/promises"

const server = net.createServer(() => { })
let fileHandle, fileStream;

server.on("connection", (socket) => {
    // when new connection it will log
    console.log("New connection")
    // when client send data we can grab data here
    socket.on("data", async (data) => {
        fileHandle = await fs.open(`storage/test.txt`, "w")
        // we can use here pipeing but for practicing perpose we are doing manually
        fileStream = fileHandle.createWriteStream()
        // write data to the destination
        fileStream.write(data);
    })

    // Handle connection end
    socket.on("end", () => {
        console.log("connection ended!")
        if (fileHandle) {
            fileHandle.close()
        }
    })
})

// IPv6 throwback url
server.listen(5050, "::1", () => {
    console.log("Uploader server lisned on:", server.address())
})