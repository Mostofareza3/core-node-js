# 🌀 Node.js Stream Types & Internal Buffer Workflow

## 📤 Writable Stream

**Writable stream** এমন একটি stream যেটাতে আমরা ডেটা লিখতে পারি।

### ✅ Example Use Cases:
- File writing
- Sending HTTP response

### 🧠 How it Works:

```
stream.write(data)
        ⬇
    [ Internal Buffer ]
        ⬇ (buffer full)
  OS/write operation শুরু হয়
```

### 📌 Important Concepts:
- Buffer-এর capacity limit থাকে
- Buffer full হলে `stream.write()` `false` return করে
- তখন "drain" ইভেন্ট এর জন্য অপেক্ষা করতে হয়

### 🧯 যখন data অনেক বড় হয়:
```js
if (!stream.write(hugeData)) {
    stream.once('drain', () => {
        // write again when buffer is empty
    });
}
```

---

## 📥 Readable Stream

**Readable stream** থেকে আমরা ডেটা পড়তে পারি।

### ✅ Example Use Cases:
- Reading files
- Receiving HTTP request body

### 🧠 How it Works:

```
stream.push(data)
        ⬇
   [ Internal Buffer ]
        ⬇ (buffer full)
 stream.on('data', chunk => {...})
```

### 📌 Important Concepts:
- Buffer full হলে stream `pause()` হয়ে যায়
- Consumer যতক্ষণ না ডেটা পড়ে, নতুন ডেটা push হয় না

---

## 🔄 Duplex Stream

**Duplex stream** একসাথে readable এবং writable।

### ✅ Example Use Cases:
- TCP socket communication

```js
const socket = new net.Socket();
socket.write('hello');
socket.on('data', chunk => {...});
```

---

## 🔁 Transform Stream

**Transform stream** Duplex stream-এর special version যেটা ডেটা modify করে পাঠায়।

### ✅ Example Use Cases:
- Compression (gzip)
- Encryption
- Data formatting (CSV to JSON)

```js
const upperCase = new Transform({
  transform(chunk, enc, cb) {
    this.push(chunk.toString().toUpperCase());
    cb();
  }
});
```

---

## 📝 Summary Table

| Stream Type      | Read | Write | Example                  |
|------------------|------|-------|--------------------------|
| Readable         | ✅   | ❌    | fs.createReadStream      |
| Writable         | ❌   | ✅    | fs.createWriteStream     |
| Duplex           | ✅   | ✅    | net.Socket               |
| Transform        | ✅   | ✅    | zlib.createGzip, custom  |

---

## 🧬 Internal Buffer Workflow Diagram

```text
Writable Stream:

stream.write(data)
        ⬇
  [ Internal Buffer ] (fills up gradually)
        ⬇ (buffer full)
  Wait for "drain" event
        ⬇
Continue writing again
```

```text
Readable Stream:

source.push(data)
        ⬇
  [ Internal Buffer ] (fills up)
        ⬇
Consumer reads using stream.on('data')
        ⬇
Buffer drained
        ⬇
Source pushes more
```


