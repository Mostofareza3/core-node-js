import dgram from "dgram"

const sender = dgram.createSocket('udp6')

sender.send("This is a string", 8000, "::1", (error, bytes)=>{
    if(error) console.log(error)
    console.log(bytes)
})