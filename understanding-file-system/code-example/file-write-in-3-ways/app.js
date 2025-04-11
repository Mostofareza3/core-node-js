
/* Promise API */

import fsPromise from "fs/promises";


(async () => {
    try {
        await fsPromise.copyFile("file.txt", "copied-promise.txt")
    } catch (error){
        console.log(error)
    }
})()

/* Callback API */
import fs from "fs"

fs.copyFile("file.txt", "cb.txt", (error)=>{
    if(error) console.log(error)
})


/* Synchoronous API */
fs.copyFileSync("file.txt", "synchronous.tsx")