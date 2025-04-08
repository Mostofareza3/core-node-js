// 0100 1000 0110 1001 0010 0001

import { Buffer } from "buffer";

const bufferContainer = Buffer.alloc(3);

bufferContainer[0] = 0x48;
bufferContainer[1] = 0x69;
bufferContainer[2] = 0x21;

// fillup buffer using from
const buff = Buffer.from([0x48, 0x69, 0x21])

// another way
const buff2 = Buffer.from("486921", "hex")

//another way
const buff3 = Buffer.from("Hi!", "utf8")

console.log(bufferContainer.toString('utf-8'))
console.log(buff3)