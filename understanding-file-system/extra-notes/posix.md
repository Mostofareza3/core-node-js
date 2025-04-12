# POSIX বনাম Non-POSIX Behavior Cheat Sheet (বাংলা)

## 🔍 POSIX কী?
**POSIX** = *Portable Operating System Interface*

এটা UNIX টাইপ অপারেটিং সিস্টেমগুলোর জন্য বানানো এক ধরনের স্ট্যান্ডার্ড। মূল উদ্দেশ্য হলো বিভিন্ন প্ল্যাটফর্মে যেন এক কোডে কাজ করা যায় — মানে portability নিশ্চিত করা।

---

## ⚙️ POSIX-Compliant Systems
- Linux (Ubuntu, Arch, Debian, etc.)
- macOS (আংশিকভাবে POSIX-compatible)
- FreeBSD
- Solaris

## 🚫 Non-POSIX Systems
- Windows (পুরোপুরি POSIX compatible না)
- কিছু embedded বা পুরনো proprietary systems

---

## 🧠 Key Differences (মূল পার্থক্য)

| Feature / Behavior                    | POSIX System-এ কীভাবে কাজ করে                                       | Non-POSIX System-এ কীভাবে কাজ করে                           |
|--------------------------------------|----------------------------------------------------------------------|---------------------------------------------------------------|
| `O_EXCL` দিয়ে ফাইল খোলা              | ফাইল আগে থাকলে error দেয়                                            | সবসময় নির্ভরযোগ্য না, বিশেষ করে network file system-এ        |
| `O_EXCL` + symlink                   | symlink থাকলেও error দেয়                                            | অনেক সময় error না-ও দিতে পারে                                |
| `fork()` system call                 | properly supported                                                   | Windows-এ নেই (ওখানে `CreateProcess`)                        |
| ফাইল permissions (`chmod`, `umask`)   | পুরো supported                                                       | ভিন্ন structure, Windows-এ ACL থাকে                          |
| ফাইল path format                     | Unix-style: `/home/user/file.txt`                                   | Windows-style: `C:\Users\user\file.txt`                    |
| File name case sensitivity           | `File.txt` ≠ `file.txt` (case-sensitive)                             | Windows-এ case-insensitive                                     |
| Symbolic Links                       | `ln -s` দিয়ে simple symlink করা যায়                                | Admin permission ছাড়া কাজ নাও করতে পারে                     |
| Signals (e.g. `SIGKILL`, `SIGTERM`)  | সাপোর্ট করে                                                         | কাজ করে না বা alternative লাগে                                |
| `select()` / `poll()`                | Low-level I/O operations সাপোর্ট করে                               | Partial support, অনেক সময় অন্য API লাগে (`WSAPoll`)         |

---

## 📦 Node.js Context এ POSIX

| Node.js Feature                     | POSIX System-এ Behavior                                              | Windows System-এ Behavior                                      |
|-------------------------------------|----------------------------------------------------------------------|----------------------------------------------------------------|
| `fs.open(path, 'wx', ...)`          | ফাইল আগে থাকলে fail করে                                            | সবসময় নির্ভরযোগ্য না                                           |
| `fs.symlink()`                      | smooth কাজ করে                                                      | অনেক সময় permission error দেয়                                 |
| `child_process.spawn()`             | Unix-এর `fork/exec` model ফলো করে                                 | Windows-এর process creation model ব্যবহার করে                 |

---

## 📘 POSIX Tools (Unix/Linux/macOS-এ available)
- `grep`, `awk`, `sed`
- `ls`, `chmod`, `chown`, `ps`, `kill`, etc.

---

## ✅ Summary (সংক্ষেপে)
👉 cross-platform কোড লেখার জন্য:
- Node.js এর built-in modules use করো
- Low-level POSIX-only feature avoid করো
- প্রয়োজন হলে platform অনুযায়ী আলাদা code path ব্যবহার করো

👉 strictly POSIX behavior চাইলে:
- Linux/macOS-এ কোড টেস্ট করো


