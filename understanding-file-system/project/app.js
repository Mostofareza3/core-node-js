
import fs from "fs/promises"


(async () =>{
    const watcher = fs.watch("./command.txt")
    const commandFile = await fs.open('./command.txt')

    for await (const event of watcher){
        if(event.eventType === "change"){
            const content = await commandFile.read()
            console.log(content)
        }
    }
})()