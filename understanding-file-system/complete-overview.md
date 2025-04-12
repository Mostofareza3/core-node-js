# Node.js File System (fs) Module

এই নোটে Node.js এর File System module (fs) নিয়ে বাস্তব জীবনে প্রায় ৯০% সময়ে কাজে লাগবে এমন গুরুত্বপূর্ণ বিষয়গুলো আলোচনা করা হয়েছে।

## 📂 File কী?
- File মানে হচ্ছে একধরনের *bit sequence*।
- কম্পিউটারের সবকিছুই কোন না কোন ফাইল হিসেবে সংরক্ষিত থাকে।
- পুরো মেমোরি/হার্ডড্রাইভে শুধুই 0 আর 1 থাকে—যেগুলো কোনো না কোনো ফাইলের ডেটা।

## ⚙️ Node.js কীভাবে File এর সাথে কাজ করে?
- Node.js সরাসরি হার্ডড্রাইভ অ্যাক্সেস করতে জানে না।
- সে *system call* (যেমন: `open()`, `read()`, `write()`) ব্যবহার করে।
- Node.js এই কাজগুলো করে `libuv` লাইব্রেরির মাধ্যমে।
- `libuv` এর ভেতরে আছে `Thread Pool`—যেটা CPU-intensive কাজগুলো asynchronous ভাবে পরিচালনা করে।

## 🛠️ ফাইল Read/Write করার তিনটা উপায়

### 1. Promise-based API ✅ (Most Recommended)
```js
import { readFile } from 'fs/promises';
const data = await readFile('file.txt', 'utf-8');
```

### 2. Callback-based API (Some Use-cases)
```js
import { readFile } from 'fs';
readFile('file.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### 3. Synchronous API ❌ (Avoid if possible)
```js
import { readFileSync } from 'fs';
const data = readFileSync('file.txt', 'utf-8');
```
> ⚠️ Synchronous API পুরো application কে block করে রাখে।

## 🤔 কোনটা ব্যবহার করা উচিত?
- ৯০% সময় `Promise-based API` ব্যবহার করাই উত্তম।
- `Callback` API এখনো অনেক লাইব্রেরি বা পুরনো কোডে থাকে, তাই শিখে রাখা ভালো।
- `Synchronous API` শুধুমাত্র তখনই ব্যবহার করতে হয় যখন শুরুতেই blocking করে কিছু ডেটা পড়তে হয় (যেমন: config file)।

## 🧵 Real Life Use Case
- ফাইল আপলোড করার সময় যদি `Sync` API ব্যবহার করা হয়, তাহলে পুরো সার্ভার ব্লক হয়ে যাবে।
- তাই সবসময় asynchronous API ব্যবহার করাই উচিত।

## 📚 আরো গুরুত্বপূর্ণ বিষয়
- `fs.existsSync()` ডিপ্রিকেটেড। এর বদলে `fs.access()` বা `fs.stat()` ব্যবহার করা উচিত।
- ফাইল stream করে পড়তে হলে `fs.createReadStream()` ব্যবহার করা হয়।
- Directory তৈরি, ফাইল ডিলিট করা, permission চেক করা, সব কিছুর জন্য আলাদা আলাদা method আছে (যেমন: `mkdir`, `unlink`, `chmod`, etc.)।
