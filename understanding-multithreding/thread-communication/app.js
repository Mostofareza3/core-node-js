const { Worker, MessageChannel } = require("worker_threads")

// Communication between 2 worker threads
const {port1, port2} =  new MessageChannel()

const thread1 = new Worker("./cal")


// message channel
// const {port1, port2} =  new MessageChannel()

// port1.postMessage({name: "Joe"})

// port1.on("message", (msg)=>{
//     console.log(msg)
// })

// port2.on("message",(msg)=>{
//     console.log("msg from port2", msg)
//     console.log("mmmd")
// })


// Example: 1
// const obj = {name: "mostofa"}

// new Worker("./calc.js", { abc: obj})
// console.log("main", obj)