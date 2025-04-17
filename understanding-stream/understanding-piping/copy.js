import fs from "fs/promises"

(async () => {
    const srcFile = await fs.open("src.txt", "r");
    const destFile = await fs.open("dest.txt", "w");

    const readStream = srcFile.createReadStream()
    const writeStream = destFile.createWriteStream()

    readStream.pipe(writeStream)
})()