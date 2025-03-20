const EventEmitter = require("events");

class Emitter extends EventEmitter{}

const myEvent = new Emitter();

myEvent.on("turnOn", (str)=>{
    console.log(`Switch pressed for ${str}`)
})

myEvent.emit("turnOn","Light")