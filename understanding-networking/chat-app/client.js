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

let id;

const socket = net.createConnection(
    { port: 3333, host: "127.0.0.1" },
    async () => {
        console.log("connected to the server!");

        const ask = async () => {
            let typing = false;
    
            // keypress listener
            process.stdin.on("data", (chunk) => {
                if (!typing) {
                    typing = true;
                    socket.write(`${id}-typing-start`);
                }
    
                // stop typing if no key is pressed for 2s
                clearTimeout(globalThis._typingTimeout);
                globalThis._typingTimeout = setTimeout(() => {
                    typing = false;
                    socket.write(`${id}-typing-end`);
                }, 2000);
            });
    
            const message = await rl.question("Enter a message:>> ");
            socket.write(`${id}-message-${message}`);
        };
        ask()


        socket.on("data", async (data) => {
            if (data.toString("utf-8").substring(0, 2) === "id") {
                id = data.toString("utf-8").substring(3)
                console.log(`your id is ${id}!\n`)
            } else {
                // when getting message
                //empty line
                console.log()
                // move cursor one line up
                await moveCursor(0, -1)
                // clear line
                await clearLine(0)
                console.log(data.toString("utf-8"))
            }

            ask()
        })
    }
);


socket.on("end", () => {
    console.log("Connection was ended!");
});