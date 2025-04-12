# 🧠 DataView Explained (in Bengali)

## 🎯 সংক্ষেপে — DataView কী?

**DataView** হলো JavaScript-এর একটি low-level API, যা `ArrayBuffer` এর উপর byte-wise access/control দেয়।  
এটা numerical data binary form-এ store ও read/write করার জন্য ব্যবহার হয়।

---

## 🔍 কেন দরকার?

যখন তোমার দরকার হয়:
- ছোট ছোট byte access (1 byte, 2 byte, 4 byte)
- `endianness` control (big/little endian)
- বিভিন্ন data type read/write করার flexibility

---

## 🧪 Syntax:

```js
const buffer = new ArrayBuffer(8);
const view = new DataView(buffer);
```

---

## 🛠️ Methods (most common):

| Method | কাজ |
|--------|------|
| `getInt8(byteOffset)` | 1 byte থেকে signed int পড়ে |
| `getUint8(byteOffset)` | 1 byte থেকে unsigned int পড়ে |
| `getInt16(byteOffset, littleEndian?)` | 2 byte পড়ে |
| `getInt32(byteOffset, littleEndian?)` | 4 byte পড়ে |
| `getFloat32(byteOffset, littleEndian?)` | 4 byte থেকে float পড়ে |
| `setInt8(offset, value)` | 1 byte এ লেখা |
| `setInt16(offset, value, littleEndian?)` | 2 byte লেখা |
| `setFloat64(offset, value, littleEndian?)` | 8 byte লেখা |

---

## 🧪 Example:

```js
const buffer = new ArrayBuffer(4);
const view = new DataView(buffer);

view.setInt16(0, 300);           // 2 byte write
console.log(view.getInt16(0));   // 300

view.setUint8(2, 255);           // 1 byte write
console.log(view.getUint8(2));   // 255
```

---

## 🔄 Endianness Control:

```js
view.setInt16(0, 0x1234, true);   // little-endian
view.setInt16(0, 0x1234, false);  // big-endian
```

- **Little endian**: least significant byte আগে
- **Big endian**: most significant byte আগে

---

## 🧾 কি DataView[] মানে?

`DataView[]` = **multiple DataView object এর array**।

```js
const buffers = [new ArrayBuffer(2), new ArrayBuffer(2)];

const views = buffers.map(buf => new DataView(buf));

views[0].setInt8(0, 42);
views[1].setInt8(0, 99);

console.log(views[0].getInt8(0)); // 42
console.log(views[1].getInt8(0)); // 99
```

🟨 Note: `DataView` নিজে কোনো Array-like structure না।

---

## 🚫 ভুল ধারণা:

```js
const view = new DataView(new ArrayBuffer(2));

console.log(view[0]);    // undefined ❌
console.log(view.length); // undefined ❌
```

---

## ✅ কখন DataView ব্যবহার করবো?

| Use Case | কারণ |
|----------|------|
| Binary file parser | PDF, JPG, MP3 ইত্যাদিতে কাজ করতে |
| WebSocket বা Stream Binary data | byte-wise read/write দরকার |
| Custom encoder/decoder বানাতে | low-level access |
| Multi-byte number control করতে | endian পরিবর্তনের জন্য |

---

## 🏁 Summary:

| বৈশিষ্ট্য | DataView |
|-----------|----------|
| Byte-wise control | ✅ |
| Endian support | ✅ |
| Flexible read/write | ✅ |
| Array-like নয় | ❌ |
| High performance use-case | ✅ |

---

## 🙌 Bonus Suggestion:

DataView জানলে তুমি আরও এগোতে পারবে নিচের দিকে:
- `Buffer` in Node.js
- `WebAssembly Memory`
- `WebGL Typed Data`
- `Binary Protocol Designing`