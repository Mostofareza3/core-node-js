

📄 typedarray-guide.md

# 🧠 TypedArray Explained (in Bengali)

## 🎯 সংক্ষেপে — TypedArray কী?

**`TypedArray`** হলো JavaScript-এর এমন কিছু special array-like object যেগুলো **same data type** এর binary values store করে **fixed size** মেমোরিতে।

> এগুলো আসল `Array` না, বরং **binary buffer** এর উপর ভিত্তি করে তৈরি। Performance-heavy কাজের জন্য — যেমন WebGL, binary file read, stream decoding — ব্যবহার হয়।

---

## ✅ Real-life Example:

C বা C++ এ যেমন বলা হয়:

```c
int numbers[5] = {1, 2, 3, 4, 5};

ঠিক তেমন JavaScript-এ:

const buffer = new ArrayBuffer(8); // 8 bytes মেমোরি
const view = new Int32Array(buffer); // প্রতি element = 4 bytes

view[0] = 42;
view[1] = 100;

console.log(view); // Int32Array [42, 100]



⸻

🔢 Available TypedArrays:

TypedArray	Size	Description
Int8Array	1 byte	signed integer (-128 to 127)
Uint8Array	1 byte	unsigned integer (0 to 255)
Uint8ClampedArray	1 byte	clamp করে 0–255
Int16Array	2 bytes	signed integer
Uint16Array	2 bytes	unsigned integer
Int32Array	4 bytes	signed integer
Uint32Array	4 bytes	unsigned integer
Float32Array	4 bytes	float
Float64Array	8 bytes	double float



⸻

🧰 কিভাবে কাজ করে?

১. ArrayBuffer:

Raw binary storage.

const buffer = new ArrayBuffer(16); // 16 bytes

২. TypedArray View:

const view = new Int32Array(buffer);
view[0] = 123;

৩. DataView (advanced):

const dv = new DataView(buffer);
dv.setInt16(0, 256);



⸻

⚙️ Practical Example:

const buffer = new ArrayBuffer(4); // 4 bytes
const intView = new Int32Array(buffer);

intView[0] = 123456;

console.log(intView[0]); // 123456



⸻

⚠️ Special Behavior:

const arr = new Uint8Array([255, 256, -1]);

console.log(arr); // Uint8Array [255, 0, 255]

	•	256 → overflow হয়ে 0
	•	-1 → 255 (unsigned conversion)

⸻

✅ কখন ব্যবহার করবো?

Use Case	Reason
WebGL / Graphics	Performance matters
Binary file parsing	PDF, JPG ইত্যাদি
Fixed-typed performance-critical data	যেখানেই speed দরকার



⸻

🏁 Summary

Feature	TypedArray
Fixed size	✅
Same data type	✅
Faster	✅
Binary buffer view	✅
Modern JS use-case	✅



⸻

🙌 Suggestion:

TypedArray বুঝলে তুমি Buffer, WebGL, Audio API, WebSocket Binary Frames, ইত্যাদি আরও অনেক advanced জিনিস সহজে বুঝতে পারবে!

---