
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

### Eigula ki amk detail e bujhao!
    •	ArrayBuffer
	•	DataView
	•	Typed Arrays
	•	Data Structure (ডেটা গঠন পদ্ধতি)
⸻

1. ArrayBuffer:

কি এটা?
ArrayBuffer হলো একটা fixed-length binary data block। অর্থাৎ এটা এক ধরনের কাঁচা মেমোরি, যেখানে ডেটা শুধু bytes আকারে থাকে (প্রতিটা byte = 8-bit)।

ব্যবহার কোথায় হয়?
ধরো তুমি একটা ছবি বা ভিডিও ফাইল read করছো, তখন এই ডেটা বাইনারি আকারে ArrayBuffer হিসেবে থাকে। এই buffer থেকে ডেটা বোঝার জন্য আমাদের নির্দিষ্ট টাইপে রূপান্তর করতে হয়।

উদাহরণ:

const buffer = new ArrayBuffer(4); // 4 bytes = 32 bits



⸻

2. DataView:

কি এটা?
DataView হলো এমন একটা interface, যেটা দিয়ে তুমি ArrayBuffer-এর উপর নিয়ন্ত্রিতভাবে read/write করতে পারো—কোন endianness (LE বা BE) ব্যবহার করবে, সেটা সহ।

উদাহরণ:

const buffer = new ArrayBuffer(4);
const view = new DataView(buffer);

view.setUint32(0, 0x12345678, true); // little-endian
console.log(view.getUint32(0, true)); // 305419896

মানে কী?
এখানে আমরা buffer-এর মধ্যে একটা সংখ্যা রেখেছি এবং আবার সেটা পড়েছি। আমরা বলে দিয়েছি এটা little-endian হবে।

⸻

3. Typed Arrays:

কি এটা?
TypedArray হলো এমন array, যেটা ArrayBuffer-এর উপর ভিত্তি করে তৈরি হয় এবং নির্দিষ্ট একটা ডেটা টাইপ ধরে রাখে (যেমন: Int8Array, Uint16Array, Float32Array ইত্যাদি)।

এটা ব্যবহার করলে তুমি numerical ডেটা অনেক দ্রুত প্রসেস করতে পারো।

উদাহরণ:

const buffer = new ArrayBuffer(4);
const intView = new Uint32Array(buffer);
intView[0] = 0x12345678;
console.log(intView[0]); // 305419896



⸻

4. Data Structure (ডেটা গঠন পদ্ধতি):

কি এটা?
Data Structure মানে হলো এমন উপায়/প্যাটার্ন, যেটার মাধ্যমে ডেটাকে সংরক্ষণ ও অ্যাক্সেস করা যায়। যেমন:
	•	Array
	•	Object
	•	Stack
	•	Queue
	•	Tree
	•	Graph
	•	Buffer ইত্যাদি।

কেন দরকার?
কারণ ঠিক ডেটা structure ছাড়া performance খারাপ হতে পারে বা ডেটা বোঝা মুশকিল হয়।

⸻

সংক্ষেপে সংযোগটা কেমন:

টার্ম	কী কাজ করে	কবে লাগে
ArrayBuffer	কাঁচা মেমোরি (byte-level) ধরে রাখে	বাইনারি ফাইল বা stream প্রসেস করতে
DataView	কাস্টমভাবে buffer read/write করতে দেয়	যখন endianness handle করতে হয়
TypedArray	টাইপসহ array তৈরি করে	ফাস্ট numerical ডেটা প্রসেস করতে
Data Structure	ডেটা সাজানোর উপায়	efficient প্রোগ্রামিং এর জন্য



⸻

### Dataview and  Typedarray arektu bisod vabe alocona koro ami kicui bujtecina!

⸻

TypedArray (টাইপড অ্যারে)

কি এটা?

TypedArray হলো এমন একটা Array যেটা শুধুমাত্র একটা নির্দিষ্ট ডেটা টাইপের মান রাখতে পারে এবং ArrayBuffer-এর উপর ভিত্তি করে কাজ করে।
মানে তুমি যদি Int8Array ব্যবহার করো, তাহলে সেখানে শুধু 8-bit signed integer রাখাই যাবে।

সবচেয়ে গুরুত্বপূর্ণ বিষয়:
TypedArray সব সময় ArrayBuffer থেকে তৈরি হয়। মনে করো, ArrayBuffer হলো খালি মেমোরি, আর TypedArray হলো সেই মেমোরিকে বোঝার উপায়।

⸻

কিছু Common TypedArrays:

TypedArray	মানে কী	Byte size
Int8Array	8-bit signed integer	1 byte
Uint8Array	8-bit unsigned integer	1 byte
Int16Array	16-bit signed integer	2 bytes
Uint16Array	16-bit unsigned integer	2 bytes
Float32Array	32-bit floating point	4 bytes



⸻

Example:

const buffer = new ArrayBuffer(4); // 4 bytes মেমোরি
const typedArray = new Uint16Array(buffer); // প্রতিটা item = 2 byte

typedArray[0] = 500;
typedArray[1] = 1000;

console.log(typedArray); // Uint16Array(2) [500, 1000]

	•	এখানে buffer ছিল ৪ byte।
	•	আমরা বলেছি সেটা Uint16Array দিয়ে ব্যাখ্যা করব (প্রতিটি মান ২ byte), তাই ২টি সংখ্যা রাখল।

⸻

DataView (ডেটাভিউ)

কি এটা?

DataView হলো ArrayBuffer এর ওপর আরও low-level control দেওয়ার উপায়।
তুমি কোন position-এ, কোন টাইপের ডেটা, কোন endianness দিয়ে read/write করবে—সব তুমি নির্ধারণ করতে পারো।

⸻

কেন দরকার?

TypedArray কিছুটা rigid—মানে পুরো buffer একটা টাইপে ধরেই কাজ করে।
কিন্তু অনেক সময় তোমার দরকার একই buffer-এর মধ্যে বিভিন্ন ডেটা টাইপ read/write করা, বা endian control করা।
তখন DataView লাগে।

⸻

Example:

const buffer = new ArrayBuffer(4);
const view = new DataView(buffer);

// নিচের লাইনটা একটা 32-bit unsigned integer লেখে (Little-endian)
view.setUint32(0, 0x12345678, true); 

// এখন সেটা আবার পড়ি
const value = view.getUint32(0, true);
console.log(value); // 305419896 (i.e. 0x12345678)

এখানে true মানে little-endian। তুমি চাইলে false দিয়ে big-endian এ কাজ করতে পারো।

⸻

TypedArray vs DataView তুলনা:

বিষয়	TypedArray	DataView
একাধিক ডেটা টাইপ ব্যবহার	না, একটাই	হ্যাঁ
Endianness কন্ট্রোল	না	হ্যাঁ
সহজ ব্যবহার	হ্যাঁ	একটু জটিল
পারফরম্যান্স	দ্রুত	একটু ধীর (কিন্তু কাস্টমাইজড)



⸻

বাস্তব উদাহরণ: একই buffer-এ দুইভাবে কাজ:

const buffer = new ArrayBuffer(4);

// TypedArray দিয়ে
const typed = new Uint32Array(buffer);
typed[0] = 0x12345678;
console.log('TypedArray:', typed[0]);

// DataView দিয়ে
const view = new DataView(buffer);
console.log('DataView (LE):', view.getUint32(0, true));  // little-endian
console.log('DataView (BE):', view.getUint32(0, false)); // big-endian



⸻



### (TypedArray হলো এমন একটা Array যেটা শুধুমাত্র একটা নির্দিষ্ট ডেটা টাইপের মান রাখতে পারে) Eta diye ki bujhaila?

“TypedArray হলো এমন একটা Array যেটা শুধুমাত্র একটা নির্দিষ্ট ডেটা টাইপের মান রাখতে পারে”
এইটা আরও সহজ করে বুঝাই—

⸻

JavaScript এর সাধারণ Array:

const arr = [1, 'hello', true, 3.14];

এখানে সব ধরণের ডেটা একসাথে রাখা যায়—number, string, boolean, float সবই।

⸻

TypedArray কেমন?

TypedArray এর মধ্যে তুমি শুধুমাত্র একটাই ডেটা টাইপ রাখতে পারো।

উদাহরণ:

const arr = new Uint8Array(4); // এখানে প্রতিটা item হবে 8-bit unsigned integer
arr[0] = 10;
arr[1] = 255;
arr[2] = 'hello'; // ভুল ডেটা টাইপ — এটাকে number এ রূপান্তর করে ফেলবে (NaN বা 0)

এখানে 'hello' বা true রাখার চেষ্টা করলে জাভাস্ক্রিপ্ট সেটা forcefully 0 বা NaN করে ফেলে, কারণ Uint8Array শুধু number (0–255) রাখে।

⸻

আরও সহজ ভাষায়:

ধরো তুমি একটা ব্যাগ বানালে যাতে শুধু আপেল রাখা যাবে।
এখন তুমি কলা রাখতে গেলে সেটা জায়গা পেলেও সেটা আপেলের মতো আচরণ করবে বা নষ্ট হয়ে যাবে।

TypedArray মানে তেমনই—তুমি আগেই বলে দাও, আমি শুধু 16-bit সংখ্যা রাখবো, তাহলে ওখানে অন্য টাইপের কিছু রাখলে সেটা মানিয়ে নেওয়ার চেষ্টা করবে, কিন্তু ঠিকভাবে কাজ করবে না।

⸻

TypedArray এর এই সীমাবদ্ধতা-টাই আসলে এর শক্তি:
	•	মেমোরি খুব efficient হয়
	•	ফাস্ট প্রসেসিং হয়
	•	বাইনারি ডেটা নিয়ে কাজ করার সময় নির্ভুলতা থাকে

⸻

বোঝা গেছে এবার? না হলে আমি ছোট্ট একটা real-life analogy দিয়ে আরও ব্যাখ্যা করতে পারি।



### Bujhci ebar. Kintu javascript e to eigula nei. Kintu node js stream e aslo kivabe?

চমৎকার! তুমি যে প্রশ্নটা করছো, “JavaScript-এ তো TypedArray, DataView এগুলা দেখি না, তাহলে Node.js stream-এর সঙ্গে এগুলা এলো কীভাবে?”—এটা খুবই valid একটা প্রশ্ন।

চলো ধাপে ধাপে ক্লিয়ার করি:

⸻

1. আসলে এগুলা JavaScript-এই আছে, শুধু আমরা আগে খুব একটা ব্যবহার করতাম না

TypedArray, ArrayBuffer, DataView—সবকিছুই JavaScript-এর অংশ, কিন্তু এগুলো মূলত low-level binary data handle করার জন্য তৈরি হয়েছে।

এগুলোকে বলা হয়:

“Binary Data Interfaces” — এগুলো সাধারণভাবে browser API বা Node.js এর ভিতরে ব্যবহৃত হয় যখন তুমি stream, file, বা network data প্রসেস করো।

⸻

2. Node.js Stream - এ এগুলা কেন আসে?

Node.js এ stream দিয়ে বড় ডেটা chunk আকারে আসে (file read, HTTP request body, etc)। এই ডেটা সাধারনত Buffer টাইপের হয়, যেটা Uint8Array এর subclass।

stream.on('data', (chunk) => {
  console.log(Buffer.isBuffer(chunk)); // true
});

এই chunk আসলে Buffer, যেটা ভিতরে TypedArray-এর মতই আচরণ করে, কারণ Buffer extends from Uint8Array.

⸻

মানে কী?

যখন তুমি stream থেকে ডেটা পাও:
	•	সেটা বাইনারি ফর্মে আসে
	•	তুমি সেটা Buffer দিয়ে ধরো
	•	Buffer → আসলে TypedArray (Uint8Array) এর মতো behave করে
	•	তুমি চাইলে DataView ব্যবহার করে ওই ডেটা থেকে specific টাইপের সংখ্যা read করতে পারো (যেমন 32-bit int, float, ইত্যাদি)

⸻

3. ছোট্ট উদাহরণ দিয়ে দেখি:

const fs = require('fs');

const stream = fs.createReadStream('data.bin');

stream.on('data', (chunk) => {
  console.log(chunk); // <Buffer ...> — এটা একধরনের TypedArray

  // Buffer হচ্ছে Uint8Array, তাই এভাবে কাজ করে:
  console.log(chunk[0]); // প্রথম byte এর মান

  // চাইলে DataView দিয়েও ব্যাখ্যা করতে পারো
  const view = new DataView(chunk.buffer, chunk.byteOffset, chunk.byteLength);
  console.log(view.getUint32(0, true)); // ৪ byte পড়ে একটা সংখ্যা বানালাম (little-endian)
});



⸻

সংক্ষেপে:

বিষয়	ব্যাখ্যা
TypedArray, DataView, ArrayBuffer	JavaScript-এর built-in Binary Data API
Node.js Buffer	Uint8Array থেকে তৈরি, অর্থাৎ TypedArray এর অংশ
Stream-এ ব্যবহার	Stream থেকে ডেটা এলে সেটা Buffer হয় → Buffer = Byte-wise data → এইখানেই TypedArray ও DataView দরকার পড়ে
Use-case	ফাইল read, ভিডিও প্রসেস, HTTP body, network packet ইত্যাদি



⸻

চাইলে আমি একটা stream থেকে data read করে, তাতে DataView দিয়ে সংখ্যা রিড করার একটা mini-demo বানিয়ে দিতে পারি। করবো?


চল, নিচে আমি একটি Node.js mini-demo project বানিয়ে দিলাম, যেখানে:
	•	আমরা একটি বাইনারি ফাইল থেকে stream দিয়ে data পড়বো
	•	তারপর সেই chunk (buffer) কে DataView দিয়ে পড়বো
	•	এবং Little-endian আর Big-endian দুইভাবে decode করে দেখবো

⸻

Step 1: একটি ছোট binary ফাইল তৈরি করো

create-binary.js

const fs = require('fs');

const buffer = Buffer.alloc(4); // ৪ byte allocate করলাম
buffer.writeUInt32LE(0x12345678); // Little-endian এ সংখ্যা লিখলাম

fs.writeFileSync('data.bin', buffer);
console.log('Binary file created!');

এটাকে একবার চালাও: node create-binary.js
এটা data.bin নামে ৪ byte-এর একটা ফাইল বানাবে, যেখানে 0x12345678 রাখা আছে।

⸻

Step 2: এখন stream দিয়ে file read করে DataView দিয়ে পড়বো

read-with-dataview.js

const fs = require('fs');

const stream = fs.createReadStream('data.bin');

stream.on('data', (chunk) => {
  console.log('Received chunk:', chunk); // Buffer

  // এখন DataView দিয়ে read করবো
  const view = new DataView(chunk.buffer, chunk.byteOffset, chunk.byteLength);

  const valueLE = view.getUint32(0, true);  // little-endian
  const valueBE = view.getUint32(0, false); // big-endian

  console.log('Little-endian decoded value:', valueLE); // 305419896 (0x12345678)
  console.log('Big-endian decoded value:', valueBE);    // 2018915346 (0x78563412)
});



⸻

Step 3: Run It!

node read-with-dataview.js



⸻

Expected Output:

Received chunk: <Buffer 78 56 34 12>
Little-endian decoded value: 305419896
Big-endian decoded value: 2018915346



⸻

কি শিখলে এই প্রজেক্ট থেকে?
	•	fs.createReadStream() দিয়ে বাইনারি ডেটা stream করা যায়
	•	Buffer আসলে Uint8Array, তাই সেটা দিয়ে DataView বানানো যায়
	•	DataView দিয়ে byte-level ডেটা কোন endianness এ read করতে চাই তা control করা যায়

⸻


### Accha tumi amk kuno exaple diye golpo diye story diye ei 3ta jinish bujhate parbe?

একটা মজার গল্প দিয়ে ArrayBuffer, TypedArray, আর DataView—এই ৩টা জিনিস একসাথে বুঝিয়ে দিচ্ছি। গল্পটা হবে “ডেলিভারি বক্সের গল্প”।

⸻

গল্পের নাম: একদিনের কুরিয়ার সার্ভিস

চরিত্র:
	•	ArrayBuffer = একটা খালি ডেলিভারি বক্স
	•	TypedArray = এক ধরনের মাল রাখার রুল—যেমন শুধু ফল, বা শুধু ওষুধ
	•	DataView = কুরিয়ার দাদা যিনি বক্সটা খুলে যা দরকার তাই বার করে নিতে পারেন, যেভাবে দরকার সেভাবে

⸻

গল্প শুরু…

1. ArrayBuffer — খালি বক্স

একটা কুরিয়ার অফিসে অনেক বক্স থাকে—সবগুলো খালি।
তুমি একটা ছোট বক্স নিতে চাও, যার মধ্যে ৪টা জিনিস রাখা যাবে।
তুমি বললে:

“দাদা, একটা ৪ item রাখার জায়গা দেন তো।”

কুরিয়ার অফিস থেকে বলল,
“এই নিন, আপনার খালি বক্স — এটা ArrayBuffer(4)।”

const box = new ArrayBuffer(4); // ৪ বাইট জায়গা

এখন তুমি বক্স পেলেও, তুমি জানো না ভেতরে কী রাখবে, কীভাবে রাখবে। কারণ এটা কাঁচা বক্স।

⸻

2. TypedArray — একরকম জিনিস রাখার নিয়ম

তুমি বললে,

“এই বক্সে আমি শুধু ছোট সাইজের আপেল রাখবো—একেকটা 1 বাইট করে।”

তখন অফিস বলল:

“তাহলে আপনাকে Uint8Array নিতে হবে। এটা TypedArray—মানে শুধু ছোট আপেল রাখার জন্য ঠিকঠাক।”

const apples = new Uint8Array(box); // ৪টা ছোট আপেল রাখবো
apples[0] = 100;
apples[1] = 200;

তুমি এখন বক্সে আপেল রাখতে পারো। কিন্তু…

তুমি শুধুই আপেল (number 0–255) রাখতে পারো, অন্য কিছু না।
আর, ১ বক্স = ১ টাইপ। তুমি মাছ, জামা, কলা একসাথে রাখতে পারো না।

⸻

3. DataView — কাস্টম কুরিয়ার দাদা

এখন তুমি ভাবলে,

“আচ্ছা, আমি তো একটা বক্সেই আপেল, জামা, ওষুধ সব রাখতে চাই—তাহলে কি TypedArray চলবে না?”

ঠিক! তখন অফিস থেকে একজন বিশেষ কুরিয়ার দাদা আসলেন—তাঁর নাম DataView।
তিনি বললেন:

“আমি আপনাকে ঠিক বলবো—
কোন ঘরে কী আছে, কেমন সাইজের জিনিস, আর কোন দিক দিয়ে পড়তে হবে।”

তুমি বললে:

const view = new DataView(box);

// প্রথম ২টা ঘরে একটা 16-bit জামা রাখলাম (Big-endian)
view.setUint16(0, 0x1234, false);

// পরের ২টা ঘরে একটা 16-bit ওষুধ রাখলাম (Little-endian)
view.setUint16(2, 0x5678, true);

এখন তুমি ওই বক্স থেকে যেভাবে খুশি ডেটা পড়তে পারো, যেভাবে দরকার, যেকোনো টাইপে।

console.log(view.getUint16(0, false)); // জামা: 0x1234
console.log(view.getUint16(2, true));  // ওষুধ: 0x5678



⸻

তাহলে সংক্ষেপে:

চরিত্র	ভূমিকা
ArrayBuffer	খালি বক্স (just memory, no meaning yet)
TypedArray	শুধু একধরনের মাল রাখার container (number, float, etc)
DataView	expert কুরিয়ার দাদা যিনি যেভাবে দরকার সেভাবে মাল রাখতেও পারেন, পড়তেও পারেন



⸻

শেষ কথা:
	•	তুমি যদি শুধু একরকম ডেটা রাখো (যেমন সব সংখ্যা), TypedArray নাও
	•	তুমি যদি জটিল বা মিশ্র ডেটা রাখো (mixed byte-level), তাহলে DataView ব্যবহার করো
	•	আর ArrayBuffer তো শুধু খালি মেমোরি—ওটা সব কিছুর ভিত্তি

⸻