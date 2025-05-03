# 🔐 Understanding Unix File Permissions

In Unix-like systems (Linux, macOS, etc.), প্রতিটা file বা ডিরেক্টরি এর access control থাকে — এটাকেই বলা হয় "file permission".

---

## 📁 Why File Permissions?

* সিস্টেমের security নিশ্চিত করতে
* কে কোন ফাইল পড়তে/লিখতে/execute করতে পারবে সেটা নিয়ন্ত্রণ করতে
* Multi-user environment এ ঝামেলা এড়াতে

---

## 📌 Permission Basics:

Unix file permissions 3টা basic operation define করে:

| Symbol | Meaning | বাংলা ব্যাখ্যা              |
| ------ | ------- | --------------------------- |
| `r`    | read    | ফাইল পড়তে পারবে             |
| `w`    | write   | ফাইল পরিবর্তন করতে পারবে    |
| `x`    | execute | ফাইল রান/execute করতে পারবে |

---

## 👥 Permission Levels:

প্রতিটা ফাইলের permission তিনজনের জন্যো define করা হয়:

1. **User (Owner)** — যেই user ফাইলটা তৈরি করছে
2. **Group** — যেই group ফাইলটা share করে
3. **Others** — বাকি সবাই

---

## 🔢 Numeric Representation (Octal)

Unix permissions numeric format এউ represent করা যায়:

| Permission | Binary | Octal |
| ---------- | ------ | ----- |
| rwx        | 111    | 7     |
| rw-        | 110    | 6     |
| r--        | 100    | 4     |
| r-x        | 101    | 5     |

### উদাহরণ:

`chmod 755 file.txt`

| User | Group | Others |
| ---- | ----- | ------ |
| rwx  | r-x   | r-x    |

মানে owner সব কিছু করতে পারবে, বাকিরা শুধু পড়তে এবং রান করতে পারবে।

---

## 🧪 Example: Check Permission

```bash
ls -l file.txt
```

Output:

```
-rwxr-xr-- 1 mostofa users 1234 May 1 13:00 file.txt
```

ব্যাখ্যা:

* `-rwxr-xr--` → permission bits
* user = `rwx`, group = `r-x`, others = `r--`

---

## 🔧 Changing Permissions

* `chmod` – change mode
* `chown` – change ownership
* `chgrp` – change group

```bash
chmod 644 file.txt   # rw-r--r--
chown root file.txt  # root কে owner বানানো
chgrp admins file.txt # admins group assign করা
```

---

## 🧠 Bonus: Special Permissions

* `s` (setuid/setgid)
* `t` (sticky bit)

🛠️ উদাহরণ:

* `/tmp` directory তে sticky bit থাকে, তাই সব user লিখতে পারলেই একে অন্যের ফাইল delete করতে পারে না।

---

## ✅ Summary:

* Unix permissions control করে কে কী access পাবে
* `r`, `w`, `x` ৩টা permission core
* Numeric এবং symbolic — দুইভাবে সেট করা যায়
* Proper permission না দিলে security risk হতে পারে!

---
