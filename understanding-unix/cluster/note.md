# Understanding Clustering in Node.js

Node.js হল single-threaded, non-blocking I/O এর জন্য জনপ্রিয় একটি runtime environment। কিন্তু by default এটি **একটি মাত্র CPU core** ব্যবহার করে। High-performance application এর জন্য এটি একপ্রকার bottleneck হতে পারে।

---

## 🔥 Clustering কেন করা হয়?

Modern computers এ সাধারণত multiple CPU cores থাকে। Node.js clustering আমাদের সেই সব cores efficiently ব্যবহার করতে দেয়।

**উদ্দেশ্য:**

* Multiple cores use করে performance বৃদ্ধি করা
* বেশি traffic handle করা
* Load balancing এর সুবিধা নেয়া

---

## ⚙️ Node by default 1ta core use kore

Node.js এর execution model এমন যে, একটি instance শুধুমাত্র একটি core use করতে পারে। তাই আমরা যদি clustering ব্যবহার না করি:

* High traffic এ server slow হয়ে যেতে পারে
* Remaining cores গুলো idle থেকে যায়

---

## 👪 Parent Process vs Child Process

Node.js clustering module (`cluster`) use করলে আমরা main process (parent) দিয়ে multiple child process (workers) run করাতে পারি।

| Role                        | Description                                    |
| --------------------------- | ---------------------------------------------- |
| **Parent Process (Master)** | Coordination kore, নিজে request handle kore না |
| **Child Process (Worker)**  | Request handle করে, actual kaj করে             |

**Parent Process এর কাজ:**

* Child process গুলা fork করা
* কোন request কোন child-এর কাছে যাবে তা control করা
* যদি কোনো child crash করে, নতুন করে restart করা

**Child Process এর কাজ:**

* Actual HTTP request serve করা
* Independent process হিসেবে কাজ করা

---

## ✅ Code Example:

```js
const cluster = require('cluster');
const http = require('http');
const os = require('os');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // automatically restart
  });
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello from worker ${process.pid}`);
  }).listen(3000);

  console.log(`Worker ${process.pid} started`);
}
```

---

## 🧠 Summary:

* Clustering দেয় একাধিক core use করার সুবিধা
* Node.js default একটাই core ব্যবহার করে
* Parent process মূলত coordinator
* Real কাজ করে child processes
* High availability ও performance-এর জন্য প্রয়োজনীয়

---