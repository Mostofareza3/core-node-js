import http from "node:http"

const agent = new http.Agent({keepAlive: true})

const request = http.request({
    agent,
    hostname: "localhost",
    port: 3000,
    method: "POST",
    path: "/create-post",
    headers:{
        "content-type" : "application/json"
    }
})

request.on("response", (response)=>{})


request.write(JSON.stringify({message: "how are you?"}))

request.end(JSON.stringify({message: "Last message"}))