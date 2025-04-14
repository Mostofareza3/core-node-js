# 📚 Readable Stream in Node.js (ডিটেইল নোটস)

### ✨ কী এই Readable Stream?

**Readable Stream** মানে হলো এমন একটা stream জেটা থেকে আমরা sequentially data "পড়া" পারি।  
এটি একপ্রকার EventEmitter যা আমাদের data এর continuous flow-এর উপর control নিতে দেয়।

---

## 📌 Real-Life Example:
- ফাইল থেকে data পড়া (`fs.createReadStream`)
- HTTP request body পড়া (যেমন: `req.on('data')`)
- Network socket থেকে data পড়া
- DataBase stream reader
- Process input (`process.stdin`)

---

## 🔍 Why Use Readable Stream?
- **Memory efficient**: বড় বড় ডেটা chunk করে পড়ে, সব একবারে মেমোরিতে আনে না।
- **Performance**: Streaming হলে পূরো ফাইল লোড করার আগেই পড়া শুরু করা যায়।
- **Asynchronous**: Event-based system, responsive & efficient.

---

## 🧠 Readable Stream এর Main Mode:

Readable Stream operates in 2 modes:
1. **Flowing Mode** – Automatically reads data and emits it via `'data'` events.
2. **Paused Mode** – You have to manually call `.read()` method.

---

## 🔑 Important Events:
| Event Name    | Description |
|---------------|-------------|
| `'data'`      | Stream এর data পাঠানোর সময় emit হয় |
| `'end'`       | সব data পড়া শেষ হলে emit হয় |
| `'error'`     | কোনো সমস্যা হলে emit হয় |
| `'close'`     | Resource বন্ধ হলে emit হয় |
| `'readable'`  | Stream থেকে data available হলে emit হয় |

---

## 📦 Buffering:

Readable stream internal buffer ব্যবহার করে ডেটা জমিয়ে রাখে জায় যতক্খণ না আমরা সেটা consume করি।  
`highWaterMark` দিয়ে কতটা ডেটা buffer করবে তা নির্ধারিত করা যায়।

---

## ✅ Commonly Used Methods:

| Method                | Description |
|-----------------------|-------------|
| `.read([size])`       | Paused mode-এ data পড়তে |
| `.pipe(destination)`  | অন্য stream-এ data pass করতে |
| `.unpipe([dest])`     | pipe বন্ধ করতে |
| `.pause()`            | flowing বন্ধ করতে |
| `.resume()`           | flowing শুরু করতে |

---

## 🔧 Example 1: Read file using createReadStream

```js
const fs = require('fs');

const readable = fs.createReadStream('example.txt', { encoding: 'utf-8' });

readable.on('data', chunk => {
  console.log('👉 Received chunk:', chunk);
});

readable.on('end', () => {
  console.log('✅ Done reading file!');
});
```

---

## ⟳ Example 2: Manual `.read()` use (paused mode)

```js
const fs = require('fs');

const readable = fs.createReadStream('example.txt');

readable.on('readable', () => {
  let chunk;
  while ((chunk = readable.read()) !== null) {
    console.log(`🧹 Chunk: ${chunk}`);
  }
});
```

---

## ⟲ Example 3: Pipe to another stream

```js
const fs = require('fs');

const readable = fs.createReadStream('example.txt');
const writable = fs.createWriteStream('copy.txt');

readable.pipe(writable);
```

---

## 🧮 Internal Workflow Chart:

```text
         Stream Created
               ↓
     [Readable internal buffer]
               ↓
   Data pushed automatically or via .read()
               ↓
     [buffer full হলে wait করে]
               ↓
      User reads data via .read() or .on('data')
               ↓
        Buffer drains, new data pushed again
```

---

## 🧪 Use Case Scenarios:

| Use Case | Description |
|----------|-------------|
| Large File Handling | Big file stream করে পড়া |
| Real-time log monitoring | Server log file live stream করা |
| HTTP Upload Handling | Multipart HTTP request stream করে পড়া |
| CLI Input | `process.stdin` থেকে data পড়া |

---

## ⚠️ কিছু Trap:

- Stream error handle না করলে program crash করতে পারে
- Buffer overflow রোধে drain and backpressure handle করা দরকার
- `.pipe()` করা হলে `.on('data')` ইউজ না করা উচিত (conflict করে)

---

## ✅ Bottom Line:

Readable stream হলো powerful tool যদি তুই large data নিয়ে কাজ করিস। File, network, HTTP, stdin সব কিছুতেয় stream পড়া কাজ করে, তাই এটার ভালো mastery থাকলে efficiency অনেক বাড়বে।

