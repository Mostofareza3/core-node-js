# 🧵 What Exactly is a Thread?

Thread হল execution unit — অর্থাৎ একটি program-এর ভিতরের ছোট execution context, যেটা CPU তে run করে।

* প্রতিটি process এ কমপক্ষে একটি thread থাকে
* Node.js default ভাবে single-threaded, কিন্তু কিছু কাজ async/thread pool ব্যবহার করে করে

### 🧠 Thread এর সুবিধা:

* Lightweight
* Efficient resource usage
* একটি process এর ভেতর multiple কাজ concurrently execute করা যায়

---

## ⚔️ Concurrent vs Parallel: কী পার্থক্য?

| Aspect     | Concurrent                    | Parallel                         |
| ---------- | ----------------------------- | -------------------------------- |
| Definition | একাধিক task একসাথে manage করা | একাধিক task একসাথে execute করা   |
| Execution  | Task switch করে দ্রুত         | Task গুলো real time এ একসাথে চলে |
| Example    | Node.js event loop            | Multithreaded CPU operations     |
| Analogy    | 1 cook juggling 3 dishes      | 3 cooks cooking 3 dishes         |

**Concurrent** মানে একই সময়ে multiple কাজের মধ্যে context switch করে করা।
**Parallel** মানে একাধিক কাজ একসাথে আলাদা core/thread এ চলা।

Node.js মূলত concurrency oriented, কিন্তু clustering/thread pool ব্যবহার করে parallelism ও করা যায়।

---
