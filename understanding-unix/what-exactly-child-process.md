# 📘 What Exactly is a Child Process in Unix & Node.js?

📄 প্রত্যেকটা প্রোগ্রাম চলাকালীন অবস্থায় একটা process হিসাবে RAM-এ run করে। Unix based system গুলাতে প্রতিটা process-এর একটি unique ID (PID) থাকে এবং প্রতিটা process-এর আবার একটি parent process (PPID) থাকে। এই parent-child সম্পর্কটাই বুঝায় — **Child Process**।

---

## 🧠 Example:

### MyApp:

* PID: 3464
* PPID (Parent Process ID): 3463

### Bash:

* Process ID: 3463
* Parent Process ID: 3462

মানে, MyApp process টি Bash এর মাধ্যমে run হয়েছে, তাই Bash হলো এর parent process।

---

## 🤔 Bash কিভাবে Kernel কে জানায় কোন process on করতে হবে?

1. জখন তোমি terminal-এ `node myapp.js` টাইপ করে Enter চেপে দাও,
2. তখন Bash shell একটি system call (`fork()`, `exec()`, etc.) এর মাধ্যমে Kernel কে বলে — “এই process টি চালু করো”।
3. Kernel RAM-এ space allocate করে process টি run করায়।

---

## 🧬 Process কোথায় চলে?

✅ প্রতিটি process Kernel এর supervision এ RAM-এ run হয়।
📍 RAM হলো actual execution জায়গা।

---

## 🔥 Why Child Processes Matter (In Node.js)

Node.js traditionally runs on a **single-threaded event loop**. Heavy কাজ, জেমন large file compression, video encoding, বা external script execution করলে main thread block হতে পারে।

📆 Solution: **child\_process module**

### ✅ Use Cases:

* External Shell command চালানো
* Background worker তৈরি
* CPU-intensive task অন্য thread এ পাঠানো

### 🔧 Example (Node.js):

```js
const { exec } = require('child_process');

exec('ls -la', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  console.log(`Result:\n${stdout}`);
});
```

---

## 📚 Summary:

| Concept               | Meaning                                        |
| --------------------- | ---------------------------------------------- |
| Process               | কোনো running program                           |
| PID                   | Process ID                                     |
| PPID                  | Parent Process ID                              |
| Bash -> Kernel        | Bash system call দিয়ে Kernel কে command দেয়    |
| Execution Space       | RAM                                            |
| Node.js Child Process | main thread ছাড়ায়ো নতুন process তৈরি করা যায় |

---

🧙 Next Time:

* fork vs spawn vs exec in Node.js
* IPC (Inter Process Communication)
