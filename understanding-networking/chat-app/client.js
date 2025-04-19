import net from "net";
import readline from "readline/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const clearLine = (dir) => {
    return new Promise((resolve, reject) => {
        process.stdout.clearLine(dir, () => {
            resolve()
        })
    })
}

const moveCursor = (dx, dy) => {
    return new Promise((resolve, reject) => {
        process.stdout.moveCursor(dx, dy, () => {
            resolve()
        })
    })
}

const socket = net.createConnection(
    { port: 3333, host: "127.0.0.1" },
    async () => {
        console.log("connected to the server!");

        const ask = async () => {
            const message = await rl.question("Enter a message:>> ");
            await moveCursor(0, -1)
            await clearLine(0)
            socket.write(message);
        }
        ask()


        socket.on("data", async (data) => {
            console.log("called")
            //empty line
            console.log()
            // move cursor one line up
            await moveCursor(0, -1)
            // clear line
            await clearLine(0)
            console.log(data.toString("utf-8"))
            ask()
        })
    }
);


socket.on("end", () => {
    console.log("Connection was ended!");
});