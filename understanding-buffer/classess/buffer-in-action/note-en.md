
# 🔧 Working with Buffer in Node.js (English Version)

We’ve already learned that `Buffer` is a container used to manage binary data in Node.js. Now, let’s learn how to **create buffers** and **store data inside them**.

---

## 🛠️ Ways to Create Buffers

### 1️⃣ Using `Buffer.alloc(size)`

```js
const bufferContainer = Buffer.alloc(3); // Allocates 3 bytes

bufferContainer[0] = 0x48; // H
bufferContainer[1] = 0x69; // i
bufferContainer[2] = 0x21; // !

🧠 We assigned 3 hexadecimal values. Their binary equivalents are:

0x48 => 0100 1000
0x69 => 0110 1001
0x21 => 0010 0001

👉 This creates the string “Hi!” in binary format.

⸻

2️⃣ Using Buffer.from([array])

const buff = Buffer.from([0x48, 0x69, 0x21]);

We created a buffer by passing an array of hexadecimal numbers.

⸻

3️⃣ Using a Hexadecimal String

const buff2 = Buffer.from("486921", "hex");

🧠 Here, “486921” means:
	•	0x48 = H
	•	0x69 = i
	•	0x21 = !

We passed a hex string to create the buffer.

⸻

4️⃣ Using a UTF-8 String

const buff3 = Buffer.from("Hi!", "utf8");

🧠 A plain string gets encoded into a buffer using UTF-8 format by default.

⸻

🔄 Convert Buffer to String

console.log(bufferContainer.toString('utf-8'));
// Output: Hi!

console.log(buff3);
// Output: <Buffer 48 69 21>

🧠 We use .toString('utf-8') to convert buffer data into a readable string.

⸻

📏 1 Byte = 8 Bits

Each buffer index holds 1 byte (8 bits)
	•	✅ Minimum value: 0
	•	✅ Maximum value: 255
(Since: 2⁸ = 256 possible values → from 0 to 255)

⛔ A regular Buffer cannot hold negative numbers.
However, using signed buffers or other encodings, it can represent negative values — which we’ll explore later.

⸻

📌 Summary (Cheat Sheet Style)

🧪 Method	🎯 Description
Buffer.alloc(size)	Creates a zero-filled buffer of given size
Buffer.from([array])	Creates a buffer from hex code array
Buffer.from("hex", "hex")	Creates a buffer from hex string
Buffer.from("Hi!", "utf8")	Creates a buffer from a UTF-8 string
.toString("utf8")	Converts buffer to string (UTF-8 format)



⸻

📁 File Created by: Mostofa Reza
📅 Date: 2025
🧪 Status: Buffer Creation and Usage Note (English Version)

---