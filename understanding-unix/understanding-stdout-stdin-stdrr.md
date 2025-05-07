# 🧠 Understanding Stdout, Stdin, and Stderr in Unix/Node.js

আমরা যখন কম্পিউটারে প্রোগ্রাম চালাই, তখন সেই প্রোগ্রাম কিভাবে input নেয়, output দেয় বা error দেখায় — এই তিনটা communication channel এর মাধ্যমেই সেটা করে: **stdin**, **stdout**, **stderr**।

---

## 📥 stdin (Standard Input)

* **কি কাজ করে?**
  এটা দিয়ে প্রোগ্রাম external input নেয় (e.g., keyboard থেকে input নেওয়া)।

* **Unix দৃষ্টিকোণ থেকে:**
  এটা হল File Descriptor 0
  অর্থাতে, 0 নম্বর channel দিয়ে input আসে।

* **Example (Node.js):**

  ```js
  process.stdin.on('data', (data) => {
    console.log(`আপনি লিখলেন: ${data}`);
  });
  ```

---

## 📤 stdout (Standard Output)

* **কি কাজ করে?**
  এটা output দেয় screen বা অন্য কোন stream এ।

* **Unix দৃষ্টিকোণ থেকে:**
  এটা File Descriptor 1

* **Example (Node.js):**

  ```js
  process.stdout.write("Hello World!\n");
  ```

---

## ⚠️ stderr (Standard Error)

* **কি কাজ করে?**
  Error messages output দেয়।

* **Unix দৃষ্টিকোণ থেকে:**
  এটা File Descriptor 2

* **Example (Node.js):**

  ```js
  process.stderr.write("ভুল হয়েছে ভাই!\n");
  ```

---

## 🧪 Real World Example

```bash
$ node app.js > output.txt
```

🖐 এটি stdout কে `output.txt` ফাইলে redirect করবে।

```bash
$ node app.js 2> error.txt
```

🖐 এটি stderr কে `error.txt` ফাইলে পাঠাবে।

---

## 🧯 Use cases in Node.js

| Channel | Description         | Node.js Method   |
| ------- | ------------------- | ---------------- |
| stdin   | Input from terminal | `process.stdin`  |
| stdout  | Standard output     | `process.stdout` |
| stderr  | Error output        | `process.stderr` |

---

## 🦝 Summary

* `stdin` = Input (Keyboard input, pipe input)
* `stdout` = Program output (results, logs)
* `stderr` = Error output (bugs, issues)

> এগুলো stream হিসেবে কাজ করে — এবং Node.js এ এগুলোর সাথে খুব সহজেই কাজ করা যায়।
