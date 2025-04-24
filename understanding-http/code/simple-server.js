import http from "node:http"


const server = http.createServer()

server.on("request", (request, response)=>{

    console.log("------- METHOD: -------")
    console.log(request.method)
    console.log("------- URL: -------")
    console.log(request.method)
    console.log("------- HEADERS: -------")
    console.log(request.headers)


    console.log("------- BODY: -------")
    request.on("data", (chunk)=>{
        console.log(chunk.toString("utf-8"))
    })
})


server.listen(3000, ()=>{
    console.log("Server listeing on", 3000)
})