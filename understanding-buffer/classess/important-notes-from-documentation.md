
# 🚀 Node.js Buffer - Important Key Topics at a Glance

Node.js এর `Buffer` module মূলত binary data handle করার জন্য ব্যবহার করা হয়। নিচে এর গুরুত্বপূর্ণ key topics তুলে ধরা হলো, যাতে ডকুমেন্টেশনের দরকারি অংশগুলো এক নজরে বোঝা যায়।

---

## 🔑 Core Buffer APIs

### ✅ `Buffer.alloc(size)`
- Initializes with 0
- Safe & clean
- Example: `Buffer.alloc(10)`

### ✅ `Buffer.allocUnsafe(size)`
- Faster, but old memory retains
- Used for performance
- Example: `Buffer.allocUnsafe(10)`

### ✅ `Buffer.from()`
- Convert string, array, or another buffer to Buffer
- Examples:
  - `Buffer.from("Hello")`
  - `Buffer.from([0x48, 0x69])`
  - `Buffer.from("486921", "hex")`

---

## 🔧 Common Buffer Methods

### 🧪 `buf.fill(value)`
- Fills buffer with specific value
```js
const buf = Buffer.alloc(4);
buf.fill('A'); // AAAA

📝 buf.write(string)
	•	Writes string into the buffer

const buf = Buffer.alloc(6);
buf.write("NodeJS");

🔎 buf.toString([encoding])
	•	Converts buffer to readable string
	•	Default encoding: 'utf8'

buf.toString('utf8');



⸻

✂️ Buffer Manipulation

➗ buf.slice(start, end)
	•	Creates a view of the buffer (shares memory)

🔁 buf.subarray(start, end)
	•	Similar to slice but often more performant

⸻

🧠 Encoding Types (Used with Buffer)
	•	'utf8' (default)
	•	'hex'
	•	'base64'
	•	'ascii'
	•	'latin1'

Buffer.from("Hello", "utf8");
Buffer.from("48656c6c6f", "hex"); // "Hello"



⸻

🚨 Buffer Length & Limits
	•	buf.length: Byte length of buffer
	•	Max buffer size: Depends on system & Node version
	•	1 Byte = 8 bits → Max value = 255

⸻

🧩 Advanced Concepts

🧪 Buffer.isBuffer(obj)
	•	Checks if obj is a Buffer

🔄 Buffer.concat([buf1, buf2, ...])
	•	Joins multiple buffers

const a = Buffer.from("Hi");
const b = Buffer.from("There");
Buffer.concat([a, b]); // "HiThere"



⸻

🧰 Use Cases

Use Case	Why Buffer?
File System (fs module)	Read/write raw data
Network Protocols	TCP, UDP binary packet handling
Stream API	Handling real-time binary stream
Encoding Conversion	Text ↔ Binary
Crypto module	Hashing & encryption data



⸻

⚡ Performance Tip
	•	Use allocUnsafe carefully — validate/overwrite memory before use.
	•	Avoid buffer leaks by freeing memory when done.

⸻

🛡️ Security Tip
	•	Never expose allocUnsafe data without overwriting — it may leak sensitive info.
	•	Always validate input length and bounds before reading/writing.

⸻

✅ This summary gives you 90% clarity of Node.js Buffer. For full docs, visit:
📘 https://nodejs.org/api/buffer.html

⸻

Happy Hacking with Buffers! 💻🔢
