
# 🔧 Working with Buffer in Node.js

আমরা আগেই জেনেছি যে `Buffer` হলো Binary Data ম্যানেজ করার জন্য একটা container। এখন আমরা শিখবো কীভাবে Buffer তৈরি করা যায় এবং Buffer-এর ভিতরে কিভাবে ডাটা রাখা যায়।

---

## 🛠️ Buffer তৈরি করার বিভিন্ন উপায়

### 1️⃣ Using `Buffer.alloc(size)`

```js
const bufferContainer = Buffer.alloc(3); // 3 bytes allocate করা হলো

bufferContainer[0] = 0x48; // H
bufferContainer[1] = 0x69; // i
bufferContainer[2] = 0x21; // !

🧠 এইখানে আমরা ৩টা হেক্সাডেসিমেল সংখ্যা সেট করেছি। এগুলোর বাইনারি রূপ:

0x48 => 0100 1000
0x69 => 0110 1001
0x21 => 0010 0001

👉 এর মানে আমরা “Hi!” স্ট্রিং তৈরি করলাম Binary Format এ।

⸻

2️⃣ Using Buffer.from([array])

const buff = Buffer.from([0x48, 0x69, 0x21]);

একই ডাটাকে Array আকারে Pass করে Buffer বানানো হলো।

⸻

3️⃣ Using Hexadecimal String

const buff2 = Buffer.from("486921", "hex");

🧠 এখানে “486921” মানে 0x48 = H, 0x69 = i, 0x21 = !
আমরা একটি Hex String pass করে Buffer তৈরি করলাম।

⸻

4️⃣ Using UTF-8 String

const buff3 = Buffer.from("Hi!", "utf8");

🧠 আমরা সরাসরি একটা স্ট্রিং pass করলাম, যেটা UTF-8 format এ কনভার্ট হয়ে Buffer তৈরি করলো।

⸻

🔄 Buffer থেকে স্ট্রিং রূপে দেখা

console.log(bufferContainer.toString('utf-8'));
// Output: Hi!

console.log(buff3);
// Output: <Buffer 48 69 21>

🧠 আমরা .toString('utf-8') ব্যবহার করে Buffer-এর ভিতরের ডাটা স্ট্রিং আকারে দেখতে পারি।

⸻

📏 1 Byte = 8 bits

Buffer এর একেকটা Cell বা Index → 1 Byte Data ধরে
	•	✅ সর্বনিম্ন মান: 0
	•	✅ সর্বোচ্চ মান: 255
(যেহেতু: 2⁸ = 256 possible values → 0 to 255)

⛔ সাধারণ Buffer Negative Number hold করতে পারে না।
তবে, Signed Byte বা অন্য encoding ব্যবহারে Negative মান দেখা যেতে পারে — যা আমরা পরবর্তী ধাপে শিখবো।

⸻

📌 Summary (Cheat Sheet Style)

🧪 Method	🎯 Description
Buffer.alloc(size)	নির্দিষ্ট মাপের খালি Buffer বানায়
Buffer.from([array])	হেক্স কোড Array থেকে Buffer তৈরি
Buffer.from("hex", "hex")	Hex string থেকে Buffer
Buffer.from("Hi!", "utf8")	স্ট্রিং থেকে Buffer (Default UTF-8)
.toString("utf8")	Buffer → String



⸻

📁 File Created by: Mostofa Reza
📅 Date: ২০২৫
🧪 Status: Buffer Creation and Usage Note

