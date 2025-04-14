# 📝 Writable Stream in Node.js (Bangla)

Node.js এ Writable Stream এমন একটি Interface যা দিয়ে আমরা ধারাবাহিকভাবে (stream আকারে) data write করতে পারি — file system, network socket বা অন্য যেকোন writable destination এ।

---

## 📘 কেন Writable Stream দরকার?

বড় ডেটা যদি আমরা একবারে write করতে চাই, তাহলে পুরো ডেটা memory-তে রাখতে হয়। এতে memory overload হতে পারে। Writable stream দিয়ে আমরা ছোট ছোট অংশে data write করতে পারি। এতে performance ভালো থাকে এবং memory-efficient হয়।

---

## 🧠 Core Concepts:

### ✅ Stream.write(chunk)

- ডেটার একটা অংশ (chunk) লিখে।
- যদি internal buffer full না হয়, `true` return করে।
- buffer full হলে, `false` return করে — তখন আমাদের `drain` event-এর জন্য অপেক্ষা করতে হয়।

### ✅ Stream.end([chunk], [encoding], [callback])

- stream-এর লেখা শেষ করে।
- চাইলে শেষবারের মত আরেকটা chunk write করা যায়।

---

## 📦 Internal Buffer কিভাবে কাজ করে?

stream.write(data)
⬇
[internal buffer full না হলে]
⬇
ডেটা write হয়
⬇
[buffer full হলে stream.write() => false]
⬇
“drain” event-এর জন্য wait করতে হয়

---

## 🧪 Real-life Example: File write using Writable Stream

```js
const fs = require('fs');
const writableStream = fs.createWriteStream('output.txt');

for (let i = 0; i < 1e6; i++) {
  const canWrite = writableStream.write(`Line number ${i}\n`);
  if (!canWrite) {
    writableStream.once('drain', () => {
      console.log('✅ Drain event triggered, writing resumed.');
    });
    break;
  }
}

writableStream.end('✅ Finished writing.');



⸻

🔁 drain Event

যখন internal buffer full হয়ে যায়, stream.write() false return করে। তখন আমাদের লেখা বন্ধ রাখতে হয় যতক্ষণ না drain event trigger হয়।

writableStream.write(bigChunk); // returns false
writableStream.once('drain', () => {
  writableStream.write('Continue writing...');
});



⸻

🛡️ backpressure কি?
	•	যখন producer (writer) ডেটা বেশি দ্রুত write করতে চায়, কিন্তু consumer (destination) সেই ডেটা accept করতে পারছে না — তখন backpressure তৈরি হয়।
	•	Writable Stream এই সমস্যাটা handle করতে পারে via internal buffer and drain mechanism.

⸻

✅ কখন Writable Stream ব্যবহার করব?
	•	বড় ডেটা যেমন — logs, reports, large JSON, ভিডিও বা ফাইল save করার সময়।
	•	socket-based communication এ (যেমন chat app, streaming server ইত্যাদি)।
	•	performance-sensitive application গুলাতে, যেখানে memory management গুরুত্বপূর্ণ।

⸻

🔚 উপসংহার

Writable Stream আমাদের বড় ডেটা ছোট ছোট chunk আকারে write করতে সাহায্য করে। এতে memory কম consume হয়, performance বাড়ে এবং আমরা backpressure handle করতে পারি সহজে।

⸻

📚 Ref:
	•	Node.js Official Docs: https://nodejs.org/api/stream.html#stream_writable_streams

---