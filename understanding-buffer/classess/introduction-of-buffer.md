

# 🧵 Understanding Binary, Hexadecimal & Encoding (Before Learning Buffer)

কম্পিউটারের দুনিয়ায় সবকিছুই শেষমেশ 0 এবং 1 — মানে Binary Data.  
Node.js এ **Buffer** মূলত এই Binary Data নিয়েই কাজ করে।  
Buffer ভালোভাবে বুঝতে হলে আগে নিচের ৩টি কনসেপ্ট খুব ভালোভাবে ক্লিয়ার থাকা জরুরি:

---

## ✅ ১. Binary Number (Base 2)

Binary হচ্ছে এমন এক সংখ্যা পদ্ধতি যেখানে শুধুমাত্র ২টি সংখ্যা থাকে — `0` এবং `1`।  
একে বলা হয় **Base 2 Number System**।

### 📌 উদাহরণ:

| Decimal | Binary  |
|---------|---------|
| 0       | 0       |
| 1       | 1       |
| 2       | 10      |
| 3       | 11      |
| 4       | 100     |
| 5       | 101     |
| 8       | 1000    |
| 15      | 1111    |

### 💡 মনে রাখার টিপস:

- প্রতিটি Binary digit কে বলে **bit**
- `8-bit` মানে হলো ৮টি 0 বা 1 এর মিলিত রূপ → যেমন: `01101001`
- কম্পিউটার RAM, Disk, File সব জায়গায় Binary Data ব্যবহার করে

---

## ✅ ২. Hexadecimal Number (Base 16)

Binary অনেক সময় পড়তে কষ্টকর হয়, তাই সহজভাবে বোঝার জন্য **Hexadecimal (base 16)** ব্যবহৃত হয়।  
Hex এ ১৬টি সংখ্যা থাকে: `0` থেকে `9`, তারপর `A` থেকে `F`

Decimal:     10 11 12 13 14 15
Hex Value:   A  B  C  D  E  F

### 📌 উদাহরণ:

| Decimal | Binary      | Hexadecimal |
|---------|-------------|-------------|
| 10      | 1010        | A           |
| 15      | 1111        | F           |
| 16      | 10000       | 10          |
| 255     | 11111111    | FF          |

### 🧠 Buffer এর সাথে সম্পর্ক:

- Buffer মূলত Binary Data রাখে
- কিন্তু যখন আমরা Buffer দেখার চেষ্টা করি, সেটা Hex format এ দেখায় — যেমন: `<Buffer 48 65 6c 6c 6f>`

---

## ✅ ৩. Character Encoding (Encoding & Charset)

আমরা Keyboard দিয়ে যা লিখি (A, B, C, $, %, 😊) — সেগুলা কম্পিউটার বুঝতে পারে না যতক্ষণ না সেগুলা **Binary** তে রূপান্তর হয়।

এই রূপান্তরের নিয়মকেই বলে **Encoding**  
Encoding এর সবচেয়ে প্রচলিত ফরম্যাট হলো:

- UTF-8
- ASCII
- UTF-16

### ✨ ASCII উদাহরণ:

| Character | Decimal | Binary      | Hex |
|-----------|---------|-------------|-----|
| A         | 65      | 01000001    | 41  |
| B         | 66      | 01000010    | 42  |
| a         | 97      | 01100001    | 61  |

### ✨ UTF-8 উদাহরণ:

| Character | Binary (UTF-8)        | Hex       |
|-----------|------------------------|------------|
| 😊         | 11110000 10011111 10011000 10001010 | F0 9F 98 8A |

### 🔍 উপকারিতা:

- Encoding না জানলে Buffer এর ভিতরে থাকা Binary data কে আমরা বুঝতে পারবো না
- Encoding define করে কিভাবে Binary কে Character এ রূপান্তর করা হবে

---

## 🔚 শেষ কথা

> Buffer হচ্ছে Binary data এর low-level representation  
> আর Buffer বুঝতে হলে Binary, Hexadecimal এবং Encoding এর পরিষ্কার ধারণা থাকাটা অপরিহার্য।

🎯 পরবর্তী ধাপে আমরা শিখবো — **Node.js Buffer কি?**, কিভাবে Buffer তৈরি করা যায়, Buffer থেকে কিভাবে Data পড়া/লেখা যায়, এবং আরও অনেক কিছু!

---

📁 File Created by: [Mostofa Reza](https://github.com/mostofareza3)  
📅 Date: ২০২৫  
🧪 Status: Learning Phase (Core Concepts)
