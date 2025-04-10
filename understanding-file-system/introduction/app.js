
import  fs  from "fs";

const content = fs.readFileSync("./text.txt");

console.log(content)

// cracter encoding
console.log(content.toString("utf-8"))