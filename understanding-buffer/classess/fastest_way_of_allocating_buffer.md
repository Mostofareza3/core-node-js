নিচের টপিকগুলো cover করা হয়েছে:
	1.	Buffer কী?
	2.	Binary, Hexadecimal, Encoding
	3.	Buffer allocation (alloc, allocUnsafe)
	4.	Buffer creation methods
	5.	Buffer methods: fill, write, toString, slice, subarray

⸻



# 📦 Node.js Buffer - বাংলায় সম্পূর্ণ গাইড

Node.js এ `Buffer` একটি খুব গুরুত্বপূর্ণ বিষয়, বিশেষ করে data stream, file system, network ইত্যাদির সাথে কাজ করার সময়। এই নোটে আমরা Buffer সম্পর্কে step-by-step সব concept clear করবো।

---

## 🔰 ১. Buffer কী?

`Buffer` হলো একটা temporary memory container — যা raw binary data রাখে। এটি সাধারণত stream data handle করার জন্য ব্যবহৃত হয়, যেমন: file read, HTTP response, network packet, ইত্যাদি।

Node.js এ Buffer ব্যবহার হয় মূলতঃ Binary Data নিয়ে কাজ করতে।

---

## 🧮 ২. Binary, Hexadecimal এবং Encoding

### ✅ Binary Number:
- Base 2 system: 0 এবং 1 নিয়ে গঠিত
- উদাহরণ: `01000001` = 65 (Decimal) = 'A' (ASCII)

### ✅ Hexadecimal Number:
- Base 16 system: 0-9 এবং A-F নিয়ে গঠিত
- উদাহরণ: `0x48` = 72 = 'H'

### ✅ Character Encoding:
- Text → Binary conversion rules (UTF-8, ASCII, Base64)
- `Buffer` UTF-8 format by default support করে

---

## 🚀 ৩. Buffer Create করার উপায়

### ✅ `Buffer.alloc(size)`
Safe way — সব value 0 দিয়ে initialize হয়।

```js
const buf = Buffer.alloc(5);
console.log(buf); // <Buffer 00 00 00 00 00>



⸻

✅ Buffer.allocUnsafe(size)

Fastest way — কিন্তু পুরনো data থাকতে পারে।

const fastBuf = Buffer.allocUnsafe(5);
console.log(fastBuf); // <Buffer 3d 89 32 ...> (random garbage)



⸻

✅ Buffer.from(array)

Hex বা utf-8 data থেকে buffer তৈরি করা যায়।

Buffer.from([0x48, 0x69, 0x21]); // "Hi!"
Buffer.from("Hi!");             // UTF-8
Buffer.from("486921", "hex");   // Hex format



⸻

⚙️ ৪. Buffer এর গুরুত্বপূর্ণ Methods

🧪 buffer.fill(value)

Buffer-এর সব value fill করে।

const buf = Buffer.alloc(4);
buf.fill('A');
console.log(buf.toString()); // AAAA



⸻

📝 buffer.write(string)

Buffer-এ string লেখা যায়।

const buf = Buffer.alloc(4);
buf.write("Hi!");
console.log(buf.toString()); // Hi!



⸻

🔎 buffer.toString()

Buffer কে human-readable string এ রূপান্তর করে।

const buf = Buffer.from("Hi!");
console.log(buf.toString()); // Hi!



⸻

✂️ buffer.slice(start, end)

Buffer-এর নির্দিষ্ট অংশ কেটে আলাদা করে — একই memory share করে।

const buf = Buffer.from("Hello");
const slice = buf.slice(0, 2);
console.log(slice.toString()); // He



⸻

🧵 buffer.subarray(start, end)

slice এর মতই, কিন্তু internal performance ভিন্ন।

const buf = Buffer.from("NodeJS");
const sub = buf.subarray(0, 4);
console.log(sub.toString()); // Node



⸻

⚡ Performance Test: alloc vs allocUnsafe

console.time('alloc');
Buffer.alloc(1000000);
console.timeEnd('alloc');

console.time('allocUnsafe');
Buffer.allocUnsafe(1000000);
console.timeEnd('allocUnsafe');

⏱️ Output:

alloc: ~4ms
allocUnsafe: ~1ms

📌 allocUnsafe() প্রায় 4 গুণ দ্রুত!

⸻

🔐 Tip

Method	Speed	Safe?	Initializes Memory?
Buffer.alloc(size)	Slow	✅ Yes	✅ Yes
Buffer.allocUnsafe(size)	Fast	⚠️ No	❌ No



⸻

🧠 Summary
	•	Buffer হল Binary Data এর temporary container
	•	Hex, Binary, UTF-8 বুঝলেই Buffer easy
	•	Memory handle করার সময় Buffer must-know concept
	•	Performance দরকার? → allocUnsafe()
	•	Security দরকার? → alloc()

⸻

🧪 Bonus Example

const buffer = Buffer.from("Hi!");
console.log(buffer);              // <Buffer 48 69 21>
console.log(buffer.toString());   // Hi!
console.log(buffer[0]);           // 72 (H)



⸻

🧰 Realtime Use Cases
	•	File read/write (fs module)
	•	Network streams
	•	TCP socket programming
	•	Binary protocol (image/audio decode)

⸻

Happy Buffer-ing! 💻🔥

