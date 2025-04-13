
import fs from "fs/promises"


(async () => {
    // commands
    const CREATE_FILE = "create a file";
    const DELETE_FILE = "delete the file";
    const RENAME_FILE = "rename the file";
    const ADD_TO_FILE = "add to the file";
    const watcher = fs.watch("./command.txt")
    const commandFile = await fs.open('./command.txt', "r")

    function createFile(path) {

    }

    commandFile.on("change", async () => {
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
        await commandFile.read(buff, offset, length, position)

        // decode data from buffer
        const command = buff.toString("utf-8")

        // create a file
        if (command.includes(CREATE_FILE)) {
            const filePath = command.substring(CREATE_FILE + 1)
            createFile(filePath)
        }

    })

    // Watcher
    for await (const event of watcher) {
        if (event.eventType === "change") {
            commandFile.emit("change")
        }
    }
})()