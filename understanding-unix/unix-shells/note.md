# 🐚 Understanding Unix Shells

---

## 🔍 What is a Unix Shell?

**Shell** হলো একটা command-line interface (CLI) যেটা তোমাকে তোমার operating system এর সাথে interact করতে দেয়। তুমি যেই command লিখো, shell সেটা ব্যাখ্যা করে OS কে বলে execute করতে।

🧠 Shell basically হল:
> “A translator between you and the kernel.”

---

## 🧠 কেন Shell important?

- তুমি OS কে ইনস্ট্রাকশন দিতে পারো (command)
- File system navigate করতে পারো
- Script লিখে automation করতে পারো (Bash, Zsh script)
- Developer হিসেবে productivity massively বাড়িয়ে দেয়
- Server বা Cloud এ কাজ করতে গেলে Shell ছাড়া চলেই না!

---

## 🛠️ Shell কোথায় ব্যবহার হয়?

| Use Case                | Description                                   |
|-------------------------|-----------------------------------------------|
| 🖥️ CLI Tools ব্যবহার      | Git, npm, node, etc সব CLI shell এর ভেতর চলে |
| ⚙️ Automation Script     | cron job, deployment script ইত্যাদি          |
| ☁️ Server Management     | Linux server, cloud VM manage করা             |
| 🧪 Testing Tool রান       | test script, debug command etc               |
| 🧵 Background Process    | long running job handle                      |

---

## 📚 Common Types of Unix Shells

| Shell     | Description                            |
|-----------|----------------------------------------|
| `sh`      | Bourne shell (সবচেয়ে পুরনো)              |
| `bash`    | Bourne Again Shell (সবচেয়ে বেশি ব্যবহৃত) |
| `zsh`     | Z Shell, modern and customizable        |
| `fish`    | Friendly Interactive SHell              |

---

## 🧪 Example Commands

```bash
cd my-project       # Directory তে move করা
ls -la              # File list দেখা
touch app.js        # নতুন file তৈরি
node app.js         # Node.js file চালানো
git init            # Git init করা