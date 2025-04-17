# 📘 Node.js: API for Stream Implementers (বাংলা ভার্সন)

## 📌 এই টার্মটার মানে কী?

Node.js এ যেই চারটা stream আছে:
- Readable
- Writable
- Duplex (both readable & writable)
- Transform (duplex + modifying data)

তুমি চাইলে এগুলার behavior override করে নিজস্ব custom stream class বানাতে পারো। এই কাজটা করার সময় **Stream Implementer API** ব্যবহার করা হয়।

---

## 🧠 কেন দরকার পড়ে?

ধরো তুমি এমন একটা data source নিয়েই কাজ করছো যা traditional file, network, stdin/stout stream না—যেমন:
- database result stream করতে চাও
- big object or array stream করতে চাও
- HTTP response modify করে stream করতে চাও

তখন তোমাকে custom stream বানাতে হবে।

---

## 🛠️ কিভাবে বানাতে হয়?

Node.js এর stream module থেকে Class extend করে override করতে হয় নিচের methods:

### ✅ Readable Stream Implement করতে হলে:
```js
import { Readable } from "stream";

class MyReadable extends Readable {
  constructor(data) {
    super();
    this.data = data;
    this.index = 0;
  }

  _read(size) {
    if (this.index < this.data.length) {
      this.push(this.data[this.index]);
      this.index++;
    } else {
      this.push(null); // No more data
    }
  }
}
```

### ✅ Writable Stream Implement করতে হলে:
```js
import { Writable } from "stream";

class MyWritable extends Writable {
  _write(chunk, encoding, callback) {
    console.log("Writing:", chunk.toString());
    callback();
  }
}
```

### ✅ Duplex Stream Implement:
```js
import { Duplex } from "stream";

class EchoDuplex extends Duplex {
  _read(size) {}

  _write(chunk, encoding, callback) {
    this.push(chunk); // Echo back the input
    callback();
  }
}
```

### ✅ Transform Stream Implement:
```js
import { Transform } from "stream";

class UpperCaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}
```

---

## 🔄 Key Lifecycle Methods:

| Method         | Stream Type        | Description                              |
|----------------|--------------------|------------------------------------------|
| `_read()`      | Readable           | কীভাবে ডেটা পড়বে সেটা define করে       |
| `_write()`     | Writable           | কীভাবে ডেটা লেখা হবে                     |
| `_transform()` | Transform          | ডেটা modify করার নিয়ম                    |
| `_final()`     | Writable/Transform | stream শেষ হবার আগে cleanup              |
| `_destroy()`   | All                | error বা destroy করার সময় cleanup        |

---

## 🔍 Use-case Example:

### 👉 Custom Readable Stream:
```js
const arr = ["hello", "world"];
const myStream = new MyReadable(arr);

myStream.on("data", chunk => {
  console.log("Received:", chunk.toString());
});
```

---

## 🧯 Error Handling Best Practices:
- `_destroy(err, cb)` override করো error handle করার জন্য
- `this.emit('error', error)` করলেই stream error ধরে ফেলবে
- `pipeline()` function ব্যবহার করো যাতে automatic error propagate হয়

---

## 📦 Production এ Use হবার মত কিছু npm Packages:
- `through2` – simplify transform stream creation
- `mississippi` – handle stream chaining
- `pump` – safer stream piping with error handling

---

## 📘 Summary:

| Point | Detail |
|-------|--------|
| What  | Stream implementers API দিয়ে custom stream বানানো যায় |
| Why   | File বা HTTP ছাড়াও custom data source stream করতে চাইলে |
| How   | Readable/Writable/Duplex/Transform class extend করে |
| Use   | Real-time DB results, file processing, stream encoding |




# 📦 When to Use Custom Streams in Node.js?

Custom Stream আমাদের তখনই use করা উচিত যখন built-in `Readable`, `Writable`, `Transform`, বা `Duplex` Stream আমাদের প্রয়োজন অনুযায়ী ঠিকভাবে behave করছে না বা আমাদের data processing এর জন্য specific কিছু logic দরকার হয়।

### ✅ কখন Custom Stream দরকার হতে পারে?

- যখন আমাদের এমন data transformation দরকার যা Node.js এর built-in stream handle করতে পারে না।
- যখন আমরা multiple asynchronous operations করতে চাই একসাথে।
- যখন huge dataset এর উপর বিশেষ ধরনের filtering, compression, encryption ইত্যাদি করতে চাই efficiently.
- যখন third-party library ব্যবহার না করে lightweight solution চাই।

---

## 🔍 Example 1: Custom Transform Stream for Data Sanitization

**Use Case:** ধরি আমাদের একটি large JSON file আছে, যেখানে sensitive fields (যেমন: password, email) আছে। আমরা চাই এসব field stream করে remove বা mask করে output দেই।

```js
import { Transform } from 'stream';

class DataSanitizeStream extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    // Sanitize or mask fields
    if (chunk.password) chunk.password = '****';
    if (chunk.email) chunk.email = 'hidden@email.com';
    this.push(chunk);
    callback();
  }
}

এই stream টি ব্যবহার করে আমরা একটি বিশাল JSON file কে stream করে প্রাইভেসি নিশ্চিত করতে পারি production environment-এ।

⸻

🔍 Example 2: Real-Time Analytics Logging

Use Case: ধরি আমরা একটি chat application বানিয়েছি যেখানে প্রতিটি message log হতে হবে একটি analytics service এ, কিন্তু আমরা চাই না যে মূল application block হোক।

import { Writable } from 'stream';

class AnalyticsLogStream extends Writable {
  constructor() {
    super({ objectMode: true });
  }

  _write(message, encoding, callback) {
    // Send to analytics service asynchronously
    sendToAnalyticsService(message)
      .then(() => callback())
      .catch(err => callback(err));
  }
}

এই stream টি ব্যবহার করে আমরা real-time এ chat message গুলিকে একদম seamlessly analytics এ পাঠাতে পারি।

⸻

🔚 Conclusion

Custom stream গুলো powerful middleware এর মতো behave করে। এগুলোর মাধ্যমে আপনি performance efficient ভাবে massive data গুলোর উপর customized operation করতে পারেন।

⸻

✅ Summary

Situation	Custom Stream দরকার?
Built-in stream sufficient নয়	✔️
Data transformation দরকার	✔️
Realtime async কাজ করতে হবে	✔️
Performance critical application	✔️

---