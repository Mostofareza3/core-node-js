import http from "http"


const port = 3000;
const hostName="192.168.3.192";

const server = http.createServer((req, res)=>{
    const data = {message: "Hello world!"}

    res.setHeader("Content-Type", "application/json")
    res.setHeader("Connectin", "close")
    res.statusCode=200;
    res.end(JSON.stringify(data))
})

server.listen(port, hostName, ()=>{
    console.log(`Server running at http://${hostName}:${port}`)
})