# 🐧 What is Unix? 

---

## 🧠 Unix কী?

Unix হচ্ছে একটি **Operating System family**  
যেটা ১৯৭০ সালে AT&T Bell Labs এ **Ken Thompson, Dennis Ritchie** রা তৈরি করে।

Unix designed হয়েছিল কিছু specific goal মাথায় রেখে:

- **Simple** (KISS principle — Keep It Simple, Stupid)
- **Modular** (Each program ছোট, একটা কাজ ভালোভাবে করে)
- **Multiuser** এবং **Multitasking** system
- **Portable** (Different hardware এ run করা যায়)
  
Unix এর ধারনা থেকে আজকের Linux, MacOS, BSD, এবং অনেক Server OS এসেছে।

---

## 📜 Unix Key Features:

| Feature | Description |
|---------|-------------|
| Multitasking | একাধিক কাজ parallel এ করতে পারে |
| Multiuser | অনেক user একসাথে ব্যবহার করতে পারে |
| Filesystem Hierarchy | সবকিছু file হিসেবে treat করা হয় |
| Permissions | Strong file & process level security |
| Pipes and Filters | Commands কে connect করে powerful workflow তৈরি করা যায় |
| Shell | Text-based user interface (Bash, Zsh etc.) |

---

# 🚀 Why Should We Care About Unix as a Backend Developer / Node.js Developer?

---

## 1. 🌍 Most Production Servers Are Unix Based

- Real world এ ৯০%+ production servers (AWS, GCP, Azure) — Linux/Unix system চালায়।
- তুমি যদি Node.js দিয়ে API/server build করো, ৯৯% সময় Linux server e deploy করতে হবে।

---

## 2. 🖥️ Terminal Commands ও Automation

- Unix shell (bash/zsh) এ কাজ করতে পারলে —
  - Server manage
  - Deployment
  - Log analysis
  - Automation script লেখা
সব সহজ হয়ে যায়।

Example:
```bash
pm2 restart all
scp myapp.zip user@server:/home/user/
tar -xvzf myapp.zip



⸻

3. ⚙️ Process Management & Performance Tuning
	•	Unix system এ তুমি process গুলো manage করতে পারো:
	•	CPU usage দেখো (top, htop)
	•	Background process handle করো
	•	Memory optimization করো

Example:

ps aux | grep node
kill -9 12345



⸻

4. 🔥 Streams, Pipes, and Filters
	•	Node.js streams concept (Readable, Writable, Duplex) — পুরোপুরি Unix philosophy থেকে এসেছে।
	•	Pipe concept:

cat access.log | grep "404" | sort | uniq -c

	•	Node.js stream:

readableStream.pipe(writableStream);



⸻

5. 🛠️ Tools & Ecosystem
	•	Docker, Kubernetes, Git, Nginx, Apache, Redis, MongoDB — সব Unix/Linux environment এ run হয়।
	•	Node.js server বা API বানালে often nginx এর সাথে reverse proxy করতে হবে।

⸻

🧊 Real World Example:

Context	Without Unix Knowledge	With Unix Knowledge
Deployment	GUI tools rely করতে হবে	SSH দিয়ে হাতে হাতে deploy করতে পারবে
Debugging	Server error বুঝতে পারবে না	Logs analyse করে fix করতে পারবে
Scaling	Tool/Service depend করতে হবে	নিজে tune ও optimize করতে পারবে



⸻

🧠 Quick Mnemonic: Why Unix?

U - Uptime guaranteed
N - Network control
I - Infrastructure management
X - eXtreme flexibility

⸻

🔚 Summary
	•	Unix হচ্ছে modern server/backend development এর base।
	•	যদি Node.js Developer হতে চাও, Unix commands, shell scripting, process management শিখতেই হবে।
	•	দিনশেষে production e যেতেই Unix ecosystem er upor depend করতে হবে।

⸻
