// import fs from "fs/promises";


// Execution time: It takes 8s to run
// CPU Usage: 70% (one core) 
// Memory Uses: 40MB
// (async()=>{
//     console.time("writeMany")
//     const fileHandle = await fs.open("text.txt", "w");

//     for(let i=0; i <1000000 ; i++){
//         await fileHandle.write(` ${i}`);
//     }
//     console.timeEnd("writeMany")
// })()


// import fs from "fs"
// (async () => {
//     console.time("writeMany")
//     fs.open("text.txt", "w", (err, fd) => {

//         for (let i = 0; i < 1000000; i++) {
//             const buff = Buffer.from(` ${i} `, "utf-8")
//             fs.writeSync(fd, buff);
//         }
//     })

//     console.timeEnd("writeMany")
// })()


/*  Using Stream */

import fs from "fs/promises";


// DON'T USE IT THIS WAY!!
// Execution time: 131.857ms
// CPU Usage: 
// Memory Uses: 200MB
// (async()=>{
//     console.time("writeMany")
//     const fileHandle = await fs.open("text.txt", "w");

//     const stream = fileHandle.createWriteStream()

//     for(let i=0; i <10000000 ; i++){
//         const buff = Buffer.from(` ${i} `, "utf-8")
//         stream.write(buff)
//     }
//     console.timeEnd("writeMany")
// })()



(async()=>{
    console.time("writeMany")
    const fileHandle = await fs.open("text.txt", "w");

    const stream = fileHandle.createWriteStream()

    const buff = Buffer.alloc(stream.writableHighWaterMark, 10) 
    console.log(stream.write(buff))
    console.log(stream.write(Buffer.alloc(1,"a")))


    stream.on("drain", ()=>{
        console.log("we are ready to write another stream")
    })

    // stream.write(buff)
    // console.log(stream.writableLength)

    console.timeEnd("writeMany")
})()