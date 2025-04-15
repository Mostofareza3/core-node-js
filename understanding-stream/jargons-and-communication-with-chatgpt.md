
### Endianness (এন্ডিয়াননেস) কী?

কম্পিউটারে তথ্য সংরক্ষণের সময় Endianness (বা byte-order) নির্ধারণ করে দেয় যে, একাধিক byte দিয়ে গঠিত একটি সংখ্যার byte গুলো কীভাবে সাজানো হবে।

প্রাথমিক বিষয়গুলো:
	•	কম্পিউটারে প্রতিটি memory location-এর একটা address থাকে।
	•	প্রতিটি byte-এ ৮ বিট পর্যন্ত তথ্য রাখা যায় (যেমন: 0x00 থেকে 0xff পর্যন্ত)।
	•	কোনো বড় সংখ্যা সংরক্ষণ করতে একাধিক byte লাগে।
	•	এখন প্রশ্ন হলো— এই একাধিক byte-কে কোন ক্রমে সাজানো হবে?

⸻

Little-endian:
	•	এখানে সবচেয়ে ছোট মানের (least-significant) byte প্রথমে (নিম্ন address এ) রাখা হয়।
	•	উদাহরণস্বরূপ, ইংরেজি বা ইউরোপিয়ান স্টাইলে যেমন তারিখ লেখা হয়: 31 December 2050, ঠিক সেভাবেই ছোট থেকে বড় মান সাজানো হয়।

Big-endian:
	•	এটি হলো এর ঠিক উল্টো। এখানে সবচেয়ে বড় মানের (most-significant) byte প্রথমে (নিম্ন address এ) রাখা হয়।
	•	উদাহরণস্বরূপ, ISO তারিখ লেখার নিয়ম যেমন 2050-12-31, বড় থেকে ছোট মান সাজানো হয়।
	•	Network communication-এ সাধারণত big-endian ব্যবহার হয়। যেমন: ইন্টারনেট, UNIX socket ইত্যাদিতে।

⸻

উদাহরণ:

ধরা যাক, একটি সংখ্যা: 0x12345678 (ডেসিমালে এটি 305,419,896)
	•	Little-endian: 0x78 0x56 0x34 0x12
	•	Big-endian: 0x12 0x34 0x56 0x78
	•	Mixed-endian (খুবই বিরল এবং পুরনো): 0x34 0x12 0x78 0x56

⸻

আরো জানুন:

এই টপিকটির সঙ্গে সম্পর্কিত কিছু গুরুত্বপূর্ণ টার্ম:
	•	ArrayBuffer
	•	DataView
	•	Typed Arrays
	•	Data Structure (ডেটা গঠন পদ্ধতি)




### Node js stream er docs portecilam. Oikhane etar reference paici. Kintu stream er sathe etar somporko ki bujhtecina?


Stream আর Endianness-এর সম্পর্ক কোথায়?

Node.js এ stream হলো এমন একটি abstraction, যেটা দিয়ে বড় ডেটা টুকরো টুকরো করে প্রসেস করা যায় (যেমন: ফাইল, নেটওয়ার্ক থেকে আসা ডেটা ইত্যাদি)।

এখন যদি সেই ডেটা বাইনারি ফর্মে থাকে (যেমন: image, video, buffer data), তখন তুমি যখন সেটা read বা write করো, তখন কোন byte আগে আসবে—এই প্রশ্নটা উঠে আসে। আর এখানেই endianness গুরুত্বপূর্ণ হয়ে যায়।

⸻

একটি বাস্তব উদাহরণ ধরো:

ধরো তুমি একটা stream থেকে ৪-Byte একটি সংখ্যা পড়ছো:

const fs = require('fs');

const stream = fs.createReadStream('binary-file.bin');
stream.on('data', (chunk) => {
    const value = chunk.readUInt32LE(0); // little-endian
    console.log(value);
});

এখানে readUInt32LE মানে হলো তুমি ধরছো ওই ৪টা byte little-endian ফর্মে আছে।

তুমি যদি ভুল endianness ধরো (যেমন: readUInt32BE - big-endian), তাহলে ডেটা গলতভাবে ব্যাখ্যা হবে।

⸻

সংক্ষেপে সম্পর্কটা:
	•	Streams → ডেটা byte আকারে দেয়।
	•	Endianness → সেই byte গুলো কীভাবে মানে রূপান্তর করবে সেটা ঠিক করে।
	•	যখন তুমি বাইনারি ডেটা read/write করো (বিশেষ করে Buffer, DataView, বা TypedArray এর মাধ্যমে), তখন endianness ঠিকভাবে না ধরলে ভুল রেজাল্ট আসবে।



চল, নিচে একটা সহজ উদাহরণ দিচ্ছি যেখানে আমরা একই বাইনারি ডেটা দুইভাবে (little-endian আর big-endian) পড়বো, আর দেখবো কীভাবে রেজাল্ট বদলে যায়:

⸻

Example: Buffer থেকে ভিন্ন Endianness এ সংখ্যা পড়া

// একটা 4-byte buffer তৈরি করলাম
const buffer = Buffer.from([0x78, 0x56, 0x34, 0x12]); 
// এটা আসলে 0x12345678 এর little-endian ফর্ম

// Little-endian হিসাবে পড়া
const littleEndianValue = buffer.readUInt32LE(0); // LE = Little Endian
console.log('Little-endian value:', littleEndianValue); // Output: 305419896

// Big-endian হিসাবে পড়া
const bigEndianValue = buffer.readUInt32BE(0); // BE = Big Endian
console.log('Big-endian value:', bigEndianValue); // Output: 2018915346



⸻

বোঝো কী হলো এখানে:

আমরা Buffer.from([0x78, 0x56, 0x34, 0x12]) দিয়ে একটা ডেটা বানালাম, যেটা আসলে little-endian হিসেবে 0x12345678।
	•	যখন আমরা readUInt32LE() ব্যবহার করলাম, তখন সেটা সঠিকভাবে little-endian হিসেবে পড়লো।
	•	কিন্তু readUInt32BE() দিয়ে পড়লে, buffer টা big-endian ধরে নেয়, ফলে পুরো সংখ্যাটাই উল্টে যায়—তুমি অন্য একটা রেজাল্ট পেয়ে যাও।

⸻

এই জিনিস stream এ কিভাবে কাজে লাগে?

Stream দিয়ে যখন তুমি বাইনারি ডেটা (buffer) পাও, তখন তোমাকে ঠিকভাবে বুঝে নিতে হয়—এই ডেটা কোন endianness-এ আছে। না হলে তুমি ডেটার মানই ভুল পাবে।

⸻

