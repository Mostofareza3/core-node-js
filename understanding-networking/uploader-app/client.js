import net from "net"
import fs from "fs/promises"

const socket = net.createConnection({ host: "::1", port: 5050 }, async () => {
    const filePath = "./text.txt";
    const fileHandle = await fs.open(filePath, "r");
    const fileStream = fileHandle.createReadStream();
    // reading from the source file
    fileStream.on("data", (data) => {
        socket.write(data)
    })

    // we should close the connection when uplaod successfull to avoid memory leak
    fileStream.on("end", ()=>{
        console.log("File upload successfully!")
        socket.end()
    })

})