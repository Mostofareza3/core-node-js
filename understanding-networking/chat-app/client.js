import net from "net";
import readline from "readline/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const socket = net.createConnection(
    { port: 3333, host: "127.0.0.1" },
    async () => {
        console.log("connected to the server!");

        const message = await rl.question("Enter a message:>> ");
        socket.write(message);
        rl.close();
    }
);

socket.on("data", (data)=>{
    console.log(data.toString("utf-8"))
})

socket.on("end", () => {
    console.log("Connection was ended!");
});