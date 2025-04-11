# 📂 Node.js কীভাবে ফাইল হ্যান্ডেল করে?

Node.js নিজে থেকে জানে না কিভাবে আমাদের কম্পিউটারের হার্ডড্রাইভ বা ফাইল সিস্টেমে অ্যাক্সেস করতে হয়। তাহলে কিভাবে করে? 🤔  
চল একটু গভীরে দেখা যাক…

---

## 🔑 মূল পয়েন্ট সমূহ (Keynotes)

### 🧠 ১. Node.js এর হার্ডড্রাইভ সম্পর্কে সরাসরি কোনো ধারণা নেই

Node.js একা একা কখনো আমাদের কম্পিউটারের হার্ডড্রাইভ অ্যাক্সেস করতে পারে না। কারণ:

- এটি **JavaScript runtime**, যা সাধারণত ব্রাউজারে চলে (যেমন Chrome)
- হার্ডড্রাইভ অ্যাক্সেস করা একটা **লো-লেভেল অপারেশন**, যেটা OS বা C/C++ level কাজ

---

### 🛠️ ২. সিস্টেম কল (System Call) ও `open()` ফাংশন

অপারেটিং সিস্টেম ফাইল অ্যাক্সেস করতে ব্যবহার করে **System Call**।  
যেমন:  
```c
int fd = open("file.txt", O_RDONLY);

এই open() হচ্ছে একধরনের System Call — যেটা ফাইল ওপেন করে OS এর কাছে থেকে একটা File Descriptor (fd) ফেরত দেয়।

⸻

🔌 ৩. Node.js → Libuv → System Call

Node.js নিজে System Call করে না। সে ব্যবহার করে:

Libuv — Node.js এর একটা C লাইব্রেরি যা System Call গুলা হ্যান্ডেল করে।

📌 উদাহরণ: যখন আমরা লিখি —

fs.readFile('file.txt', callback)

✅ তখন ভিতরে ভিতরে কাজ করে:

Node.js → Libuv → C/C++ → OS System Call → হার্ডড্রাইভ থেকে ফাইল পড়ে আনা



⸻

🧵 ৪. Libuv এর ভিতরের Thread Pool

Libuv এর ভিতরে থাকে এক বা একাধিক থ্রেড, যাকে বলে Thread Pool।
এই থ্রেড গুলো ব্যবহার করে:
	•	ব্লকিং কাজ গুলো করে নেয় (যেমন — ফাইল IO, DNS lookup, compression)
	•	মেইন থ্রেড ব্লক না হয়ে Non-Blocking Async IO বাস্তবায়ন করে

⸻

🧭 সারাংশ (Summary)

ধাপ	ব্যাখ্যা
Node.js	ফাইল রিকোয়েস্ট পাঠায়
Libuv	System Call invoke করে
System Call	ফাইল এক্সেস করে হার্ডড্রাইভ থেকে
Thread Pool	Heavy ফাইল কাজ গুলো থ্রেডে করে


📌 
	•	fs module use করে আমরা file read/write করতে পারি
	•	Under the hood, সব কাজ Libuv ও Thread Pool এর মাধ্যমেই হয়
	•	File IO কাজ গুলো asynchronous হলেও চাইলে synchronous ভাবে করাও যায় (যেমন fs.readFileSync())



========================


⸻



# 🛠️ Node.js এ File Read/Write করার ৩টি ভিন্ন উপায়

Node.js এ ফাইল read/write করার মূলত ৩টি ভিন্ন পদ্ধতি আছে।  
তিনটিই একই কাজ করে, কিন্তু performance ও usability দিক থেকে আলাদা।

---

## 🔁 ১. Callback-based API

**Old-school style** যেটা Node.js এর শুরু থেকেই ছিল।  
```js
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

📌 Callback hell তৈরি করে বড় প্রজেক্টে।

⸻

🌟 ২. Promise-based API (Modern & Recommended)

ES6 এর পর থেকে Promises ও async/await জনপ্রিয় হয়ে উঠে।

const fs = require('fs/promises');

async function readFileAsync() {
  const data = await fs.readFile('file.txt', 'utf8');
  console.log(data);
}
readFileAsync();

✅ Cleaner syntax
✅ Easy to maintain
✅ Better async control

⸻

🧱 ৩. Synchronous API (Blocking)

Synchronous version সব কাজ main thread কে block করে।

const fs = require('fs');

const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);

❌ Performance issue
❌ পুরো অ্যাপ্লিকেশন freeze হয়ে যেতে পারে
✅ কিছু special case এ দরকার হয় (e.g. startup config read)

⸻

🤔 কোনটা ব্যবহার করা উচিত?

Approach	Recommendation	Use Case
Callback API	Avoid if possible	Legacy code বা high-speed repeated calls
Promise API	✅ Use 90% of the time	Async read/write, production use
Sync API	❌ Avoid unless needed	App startup time, config read



⸻

⚠️ একটা বাস্তব উদাহরণ:

ধরো তুমি একটা বড় ভিডিও ফাইল upload করছো…

	•	যদি তুমি Sync API দিয়ে কাজ করো:
	•	পুরো অ্যাপ্লিকেশন থেমে যাবে ফাইল শেষ না হওয়া পর্যন্ত ❌
	•	যদি তুমি Promise API বা Callback API ব্যবহার করো:
	•	কাজ হবে asynchronously — ইউজার অন্য কাজ চালিয়ে যেতে পারবে ✅

⸻

🧠 Summary
	•	➤ Callback পুরনো ও কম ব্যবহৃত
	•	➤ Promise হচ্ছে স্ট্যান্ডার্ড ও cleaner way
	•	➤ Sync API সাবধান হয়ে ব্যবহার করতে হয়, main thread block হয়

