// the lowest level networking module in Node.js
import net from "net"

// TCP connection
const server = net.createServer((socket)=>{
    socket.on("data", (data)=>{
        console.log(data.toString("utf-8"))
    })
})

server.listen(3099, "127.0.0.1",()=>{
    console.log("server opened on:>", server.address())
})