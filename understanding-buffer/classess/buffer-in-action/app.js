
const { Buffer } = require("buffer");

// allocate buffer
const memoryContainer = Buffer.alloc(4); // 4 bytes (32 bits)


memoryContainer[1] = 0Xf4;
// memoryContainer[2] = -22;
memoryContainer.writeInt8(-22,2)


console.log(memoryContainer[1])
console.log(memoryContainer.readInt8(2))


console.log(memoryContainer.toString("hex"))
