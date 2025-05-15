
const cpeak = require("cpeak")


const server = new cpeak()

server.route("get", "/" , (req, res)=>{
    res.json({message: "Working"})
})

server.route("get", "/heavy", (req, res)=>{
    for(let i=0; i<100000000000; i++) {}
    res.json({message: "Heavy operation"})

})

const PORT = 5090;

server.listen(PORT, ()=>{
    console.log('listening', PORT)
})