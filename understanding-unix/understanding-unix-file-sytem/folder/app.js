import fs from "node:fs"
// import './file.js'


const content = fs.readFileSync("./text.txt", "utf-8")
console.log(content)