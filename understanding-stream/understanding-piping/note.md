# Node.js: Stream Piping, Pipeline, and Error Handling (Detailed Notes)

## 🔄 What is Piping in Node.js?

**Piping** is a mechanism to connect the output of a **Readable Stream** to the input of a **Writable Stream** directly using `.pipe()` method.

### ✅ Example:
```js
const fs = require('fs');

const readable = fs.createReadStream('./input.txt');
const writable = fs.createWriteStream('./output.txt');

readable.pipe(writable);
```

- এখানে `readable` stream থেকে data read করে `writable` stream-এ write হচ্ছে।
- Manual way তে `.on('data')` ও `.write()` handle করতে হতো, `.pipe()` সব automate করে ফেলে।

---

## 📌 Should You Use `.pipe()` in Production?

- **Small to medium scale project**: হ্যাঁ, `.pipe()` অনেক simple এবং efficient।
- **Complex system with multiple streams or error-prone operations**: না, সেখানে `pipeline()` use করা better.

---

## 🛠️ What is `pipeline()` in Node.js?

`pipeline()` method টি এসেছে Node.js `stream` module থেকে। এটি `.pipe()` এর advanced এবং safer version।

### 🔍 Features:
- Automatic error propagation
- Callback support
- Cleaner code

### ✅ Example:
```js
const fs = require('fs');
const { pipeline } = require('stream');

pipeline(
  fs.createReadStream('input.txt'),
  fs.createWriteStream('output.txt'),
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);
```

---

## 📦 pump (npm package)

`pump` হলো এক ধরনের lightweight wrapper যা multiple streams-এর মধ্যে `.pipe()` chaining করে এবং automatically error handle করে। এটি অনেকটা পুরাতন Node.js version এর জন্য pipeline-এর alternative।

### ✅ Install:
```bash
npm install pump
```

### ✅ Example:
```js
const fs = require('fs');
const pump = require('pump');

pump(
  fs.createReadStream('input.txt'),
  fs.createWriteStream('output.txt'),
  function (err) {
    if (err) console.error('Pump failed', err);
    else console.log('Pump succeeded');
  }
);
```

---

## ❓ Real Life Example: 10GB File Stream এর মধ্যে 4GB পড়ার পর Error হলে কি হবে?

ধরো তুমি একটা 10GB `.txt` ফাইল stream করতেছো।
4GB stream হওয়ার পর যদি কোন কারণে error হয়, তাহলে:

### `.pipe()` ব্যবহারে:
- Error auto-handle হয় না
- Data corrupted হতে পারে

### `pipeline()` বা `pump` ব্যবহারে:
- Error automatically propagate হয়
- তুমি callback এর মাধ্যমে error catch করতে পারো

---

## 🔁 If I re-run the script, will it start from 0?

**Yes** — যদি তুমি stream আবার শুরু করো, সেটা **start থেকে** read শুরু করবে। এর অর্থ:
- পুরা 10GB file আবার শুরু থেকে পড়া হবে
- আগে লেখা 4GB data destination file এ থাকবে (unless overwrite করা হয়)

### ⚠️ Caveat:
- তুমি চাইলে আগের written data skip করে read শুরু করতে পারো using `fs.createReadStream(path, { start: position })`

---

## 📊 Visual Flow of Stream with `.pipe()`

```
[Readable Stream] → pipe() → [Writable Stream]
     ↓                         ↑
 [Internal Buffer fills]      |
     ↓                         |
 [Emits data]                 |
     →→→→→→→→→→→→→→→→→→→→→→→→→
```

---

## ✅ Final Recommendation:
- Simple case? Use `.pipe()`
- Production, large files, complex chain? Use `pipeline()`
- Old Node version or preference? Use `pump`

---

Happy Streaming! 🚀

