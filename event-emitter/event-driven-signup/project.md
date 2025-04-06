

⸻



# 📦 Event-Driven User Signup System (Node.js)

এই প্রজেক্টটি একটি সিম্পল EventEmitter ভিত্তিক অ্যাপ্লিকেশন যা Node.js দিয়ে তৈরি। এখানে আমরা ইউজার signup করার পর বিভিন্ন কাজ event trigger এর মাধ্যমে আলাদা আলাদা ভাবে handle করবো।

---

## 🧠 শেখার বিষয়:

✅ Node.js এর EventEmitter কিভাবে কাজ করে  
✅ একাধিক ইভেন্ট লিসেনার কীভাবে একটি ইভেন্টে কাজ করে  
✅ decoupled, scalable আর্কিটেকচার কীভাবে বানানো যায়  
✅ বাস্তবজীবনের ইভেন্ট-ড্রিভেন সিস্টেমের ধারণা  

---

## 🚀 ইউজার ফ্লো:

🧍 ইউজার নাম ইনপুট করে
↓
🧾 সাইনআপ সার্ভিস ইউজারকে “DB”-তে সেভ করে
↓
📣 ‘userCreated’ ইভেন্ট ট্রিগার করে
↓
🎯 নিচের ৩টি কাজ আলাদা listener দিয়ে হয়:
📧 Welcome email পাঠানো হয়
📊 CRM-এ ইউজারকে যোগ করা হয়
📈 Analytics log আপডেট করা হয়

---

## 🗂️ ফোল্ডার স্ট্রাকচার

event-driven-signup/
│
├── index.js                  # Entry Point
├── events.js                 # Custom EventEmitter instance
├── listeners/                # All event listeners
│   ├── sendWelcomeEmail.js
│   ├── addToCRM.js
│   └── logToAnalytics.js
└── services/
└── signupService.js      # Signup logic and event emit

---

## 📁 কোড ব্যাখ্যা

### 🔸 events.js

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();
module.exports = emitter;



⸻

🔸 listeners/sendWelcomeEmail.js

const emitter = require('../events');

emitter.on('userCreated', (user) => {
  console.log(`📧 Welcome email sent to ${user.name}`);
});



⸻

🔸 listeners/addToCRM.js

const emitter = require('../events');

emitter.on('userCreated', (user) => {
  console.log(`📊 User added to CRM: ${user.name}`);
});



⸻

🔸 listeners/logToAnalytics.js

const emitter = require('../events');

emitter.on('userCreated', (user) => {
  console.log(`📈 Analytics updated for: ${user.name}`);
});



⸻

🔸 services/signupService.js

const emitter = require('../events');

function signupUser(name) {
  const user = { id: Date.now(), name };

  console.log(`✅ User saved to DB: ${user.name}`);

  // ইভেন্ট ট্রিগার করো
  emitter.emit('userCreated', user);
}

module.exports = signupUser;



⸻

🔸 index.js

const signupUser = require('./services/signupService');

// সব লিসেনার লোড করো
require('./listeners/sendWelcomeEmail');
require('./listeners/addToCRM');
require('./listeners/logToAnalytics');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('👉 Enter user name: ', name => {
  signupUser(name);
  readline.close();
});



⸻

✅ যে কনসেপ্টগুলো এক্সপ্লোর করা গেলো

🔍 টপিক	ব্যাখ্যা
EventEmitter	কাস্টম ইভেন্ট তৈরি ও হ্যান্ডল
Multiple Listeners	এক ইভেন্টে একাধিক কাজ
Loose Coupling	Signup logic ও Email/CRM/Log আলাদা
Scalability	চাইলে future এ আরও listener যোগ করা যাবে



⸻

🔥 Bonus Suggestion

চাইলে নিচের advanced ফিচারগুলো যুক্ত করতে পারো:
	•	Listener গুলো async বানানো (setTimeout দিয়ে delay simulate করে)
	•	Error handling → কোনো listener fail করলে log করো
	•	Nested event trigger → welcomeEmailSent ইভেন্ট

⸻

🎓 Final Thought

এই ছোট্ট প্রজেক্টটা দিয়ে তুমি EventEmitter এর সব core concept মাথায় বসিয়ে ফেলতে পারবে। এটি future বড় systems এর foundation তৈরিতে অনেক সাহায্য করবে। ❤️

---
