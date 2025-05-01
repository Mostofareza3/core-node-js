একদম ঠিক আছে ভাই! নিচে বাংলায় ও English টার্ম মিক্স করে Node.js Child Process নিয়ে পুরোপুরি বিস্তারিত README.md নোট লিখে দিলাম যাতে তুমি রেপোতে সরাসরি ইউজ করতে পারো:

⸻



# 🧠 Node.js Child Process - বিস্তারিতভাবে

Node.js child process module দিয়ে তুমি তোমার main Node.js process থেকে নতুন operating system-level process চালাতে পারো। মানে হচ্ছে, Node.js দিয়েই তুমি অন্য কোন command বা script (যেমনঃ Python script, shell command, ffmpeg, git etc) চালাতে পারো।

---

## 🤔 কেন দরকার হয়?

Node.js নিজে single-threaded non-blocking architecture ইউজ করে। তবে কখনো কখনো আমাদের এমন কাজ করতে হয় যা computationally heavy বা যেটা external tools দিয়েই করতে হয় (যেমন video encoding, shell command চালানো)। তখন child process use করে আমরা main event loop কে block না করেই কাজ করতে পারি।

---

## 🛠️ Real World Use Case

- 🔄 FFmpeg দিয়ে ভিডিও encode করা
- 🧪 Python script চালিয়ে AI/ML inference নেওয়া
- 🗃️ বড় file compress বা decompress করা (zip/unzip)
- 🐚 Shell command চালানো (যেমন: `git`, `ls`, `cat`)
- 💻 অন্য CLI tool invoke করা

---

## 📦 Module Import

```js
const { exec, spawn, fork, execFile } = require('child_process');



⸻

🔧 Methods Explained

1. exec()

Shell command চালায় এবং একসাথে সম্পূর্ণ output দিয়ে দেয়।

const { exec } = require('child_process');

exec('ls -la', (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error: ${error.message}`);
    return;
  }
  console.log(`📦 Output:\n${stdout}`);
});

	•	Use case: ছোট shell command, যেটা খুব বেশি output দেয় না।

⸻

2. spawn()

Live stream data handle করে (stdout, stderr)। Continuous বা বড় output এর জন্য ভাল।

const { spawn } = require('child_process');

const ls = spawn('ls', ['-la']);

ls.stdout.on('data', (data) => {
  console.log(`📤 Output: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`❗ Error: ${data}`);
});

ls.on('close', (code) => {
  console.log(`🔚 Process exited with code ${code}`);
});

	•	Use case: বড় কমান্ড, live output দেখানো, process control দরকার

⸻

3. execFile()

একটা external executable ফাইল চালায়। Shell use করে না।

const { execFile } = require('child_process');

execFile('node', ['--version'], (error, stdout) => {
  if (error) throw error;
  console.log(`📦 Node version: ${stdout}`);
});

	•	Use case: যদি তুমি শুধু কোনো executable চালাতে চাও shell command ছাড়াই

⸻

4. fork()

একটা নতুন Node.js child process চালায়, যেটার সাথে তুমি message pass করতে পারো।

// parent.js
const { fork } = require('child_process');
const child = fork('child.js');

child.on('message', (msg) => {
  console.log(`📨 Message from child: ${msg}`);
});

child.send('Hello child!');

// child.js
process.on('message', (msg) => {
  console.log(`📥 Received from parent: ${msg}`);
  process.send('Pong!');
});

	•	Use case: IPC (Inter-process communication), দুইটা Node process এ message pass

⸻

📌 কখন কোনটা ব্যবহার করবো?

Method	Shell Use	Async?	Best Use Case
exec	✅	✅	ছোট command যেটা full output দেয়
spawn	✅	✅	বড় output/stream handle করতে
execFile	❌	✅	যদি শুধু executable ফাইল রান করতে চাও
fork	❌	✅	দুই Node.js process এর মধ্যে communication



⸻

⚠️ সতর্কতা
	•	exec() একসাথে পুরো output রাখে buffer এ। বড় output হলে crash করতে পারে।
	•	spawn() preferred for performance-sensitive or large output task
	•	সব child process asynchronous, তাই proper error handling দরকার

⸻

✅ Summary
	•	Node.js এর মাধ্যমে তুমি external command/process চালাতে পারো
	•	Main thread block না করে তুমি বড় কাজ করাতে পারো
	•	Shell task, Python script, video compress, file handle সব কিছু সম্ভব
	•	fork() ব্যবহার করে IPC system তৈরি করা যায়

⸻