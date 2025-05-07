# 📁 Understanding Unix File System, Paths & CWD

Unix বা লিনাক্স based OS গুলোর file system structure এটু ভিন ও গঠনগতভাবে শক্তিশালীর একটি গঠনো. Node.js সহ যেকনো backend বা CLI কাজ করতে গেলে এই বিষয়গুলো ক্লিযার থাকা খুব জরুরি।

---

## 🧱 How Our File System is Structured?

Unix file system একটি tree এর মতো গঠিত হয়, যার root directory হলো `/`।

```bash
/
├── bin       → Essential binaries (e.g. ls, bash)
├── etc       → System configuration files
├── home      → User directories (e.g. /home/yourname)
├── usr       → User programs and data
├── var       → Logs, spool files etc.
├── tmp       → Temporary files
└── root      → Root user's home
```

**Important Point**: সব path `/` থেকে শুরু হয়। এটা `root` directory.

---

## 🛚 Absolute vs Relative Paths

### ✅ Absolute Path

- এটি root `/` directory থেকে শুরু হয়।
- Example: `/home/yourname/Documents/file.txt`

```bash
cd /etc/nginx
```

### ✅ Relative Path

- এটি বর্তমান working directory (CWD) থেকে হিসাব করা হয়।
- Example: `./Documents/file.txt`, `../public`

```bash
cd ../scripts
```

---

## 📌 What is CWD?

CWD = Current Working Directory

Node.js, Bash, Python — যেকনো execution environment এর একটা নিজস্ব *current* directory থাকে যেখান থেকে সব relative path হিসাব করে।

### 📍 In Bash:

```bash
pwd     # Show Current Directory
cd      # Change Directory
```

### 📍 In Node.js:

```js
console.log(process.cwd()); // Show current working dir
```

---

## 🧪 Example

Assume করো তুমি `/home/user/project` ডিরেক্টরিটিতে আছো।

```bash
pwd
# Output: /home/user/project
```

Now:

```bash
cd src     # relative path
cd /etc    # absolute path
```

---

## 🧠 Why This Matters?

- CLI tools বানাতে
- Script path resolve করতে
- File system operations (read/write)
- Server static file serve
- Proper file reference in large projects

---

### ✅ Bonus: Useful Shell Commands

```bash
ls      # List files
pwd     # Current directory
cd ..   # Go one level up
cd ~    # Go to home dir
```

---

## 🖚 Summary

| Topic              | Description                         |
|--------------------|-------------------------------------|
| `/`                | Root of Unix file system            |
| Absolute Path      | Path starting from `/`              |
| Relative Path      | Path based on current dir           |
| `pwd`              | Show current working dir            |
| `process.cwd()`    | Node.js current working dir         |

---
