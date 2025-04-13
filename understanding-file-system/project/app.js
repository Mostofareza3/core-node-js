
import fs from "fs/promises"


(async () =>{
    const watcher = fs.watch("./command.txt")
    const commandFile = await fs.open('./command.txt', "r")

    commandFile.on("change", async()=>{
        // get size of the file
        const size = (await commandFile.stat()).size
        // allocate buffer with the size of file
        const buff = Buffer.alloc(size)
        // the position we want to start reading
        const position = 0;
        // the location at which we want to start filling our buffer
        const offset = 0;
        // how many bytes we want to read
        const length = buff.byteLength;
        const content = await commandFile.read(buff, offset, length, position)
        console.log(content)
    })

    for await (const event of watcher){
        if(event.eventType === "change"){
            commandFile.emit("change")
        }
    }
})()