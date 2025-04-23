import dgram from "dgram"

const receiver = dgram.createSocket()


receiver.on("message",(message, remoteInfo)=>{
    console.log(`Server got: ${message} from ${remoteInfo.address}:${remoteInfo.port}`)
})


receiver.bind({address:"::1", port:8000})


receiver.on("listening",()=>{
    console.log(`server listening`, receiver.address())
})