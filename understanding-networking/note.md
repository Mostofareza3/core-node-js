# Networking Concepts (Node.js Context)

## ১. Switch কী?
**Switch** হল একটি **networking device**, যা একাধিক **device** কে একটি **network** এর মধ্যে connect করে এবং ডেটা সঠিকভাবে গন্তব্যে পাঠাতে সাহায্য করে।

### কিভাবে কাজ করে?
Switch প্রতিটি device এর **MAC address** মনে রাখে এবং ডেটা পাঠানোর সময় দেখে, কোন port এ কোন device আছে, তারপর সেই নির্দিষ্ট পোর্টে ডেটা forward করে।

### Example:
যেমন ধরো, একটি অফিসে ৫টি কম্পিউটার আছে, তখন এই ৫টি কম্পিউটার switch এর মাধ্যমে connected থাকবে। A যদি B কে ডেটা পাঠায়, তাহলে switch জানে B কোন পোর্টে আছে, আর তাই সরাসরি ওই পোর্টে ডেটা পাঠাবে।

---

## ২. MAC Address কী?
**MAC** (Media Access Control) address হল **প্রত্যেকটি networking hardware device** এর একটি **unique identifier**। সাধারণত ১২টি hexadecimal digit এর একটি fixed format হয়।

### Example:
```
E0:4C:68:1F:AE:32
```

### কেন দরকার?
- ডেটা কোন device এ যাবে তা নির্ধারণ করতে MAC address ব্যবহৃত হয়।
- **Switch** গুলো এই MAC address দেখে ডেটা forwarding করে।

---

## ৩. Network Interface Card (NIC)
**NIC বা Network Interface Card** হল সেই hardware যেটা একটি computer কে network এর সাথে connect করে।

### কি থাকে?
- এতে থাকে MAC Address
- Wired বা Wireless network connect করার জন্য port/interface

### Real-life Example:
তুমি যখন ল্যাপটপে LAN ক্যাবল লাগাও, তখন সেই ক্যাবলটা NIC এর মধ্য দিয়ে তোমার ডিভাইসকে নেটওয়ার্কে সংযুক্ত করে।

---

## ৪. Packet কী?
**Packet** হল ছোট ছোট ডেটার unit, যেগুলো ইন্টারনেট বা নেটওয়ার্কের মধ্যে দিয়ে **transmit** হয়। 

### Packet Structure:
- **Header** → source & destination address
- **Payload** → actual data/content

### কেন দরকার?
একবারে বড় ডেটা পাঠানো risky, তাই ডেটা ভাগ করে ছোট ছোট packet বানিয়ে পাঠানো হয়। পরে receiver সেই packets গুলো জোড়া লাগিয়ে পুরো message তৈরি করে।

---

## ৫. Frame কী?
**Frame** হল **Data Link Layer** এর একটা unit, যেটা physical network এ পাঠানো হয়।

### Frame vs Packet:
- **Packet** তৈরি হয় Network Layer এ
- **Frame** তৈরি হয় Data Link Layer এ
- Frame এর ভিতরে **Packet থাকে** (Wrapping এর মত)

### Structure:
- **Frame Header** → MAC address
- **Packet/Data** → Actual packet from network layer
- **Frame Trailer** → Error checking info

### Analogy:
Packet হল চিঠি, আর Frame হল খামের মত – যেটা সেই চিঠিটা ঢেকে ও ঠিকানাসহ পাঠায়।

---

## ৬. Router কী?
**Router** হল একধরনের network device যা বিভিন্ন networks (যেমন: একাধিক LAN বা WAN) এর মধ্যে **data packet routing** করে।

### কিভাবে কাজ করে?
Router ইন্টারনেটের ভিতরে এবং বাহিরে যাওয়া **packets** কে গন্তব্য অনুযায়ী পথ নির্দেশ করে। প্রতিটি router route table দেখে ঠিক করে, কোন packet কোন পথে যাবে।

### Real-life Example:
তুমি বাসায় Wi-Fi router ব্যবহার করো। ওটা তোমার home network কে ISP এর মাধ্যমে ইন্টারনেটের সাথে connect করে দেয়।

---

## ৭. ইন্টারনেট কিভাবে কাজ করে? (How the Internet Works)

### Step by Step:
1. **Client Request:** তুমি Browser এ গিয়ে টাইপ করলে `www.example.com`
2. **DNS Resolution:** DNS server ওই domain নাম থেকে **IP address** খুঁজে দেয়
3. **Packet Creation:** Browser থেকে request **packet** এ রূপান্তরিত হয়
4. **Routing:** Packet Router ও Switch হয়ে ISP → backbone → target server এর দিকে যায়
5. **Server Response:** Server তোমার request পেয়ে response পাঠায় → আবার router ও switch হয়ে তোমার কাছে packet আসে
6. **Rendering:** Browser সেই data নিয়ে তোমাকে ওয়েবপেজ দেখায়

### Key Technologies:
- DNS
- IP Address
- Router & Switch
- HTTP/HTTPS
- TCP/IP Protocol Stack

### Analogy:
তুমি চিঠি পাঠাচ্ছো – DNS হল address খোঁজা, Router হল post office যেটা চিঠি কোথায় পাঠাবে ঠিক করে, আর Packet হল চিঠি নিজে।

---

## Summary:
| Concept | Layer | Description |
|--------|-------|-------------|
| Switch | Physical/Data Link | Network device to connect multiple devices |
| MAC Address | Data Link | Unique ID of a device in a network |
| NIC | Hardware | Interface to connect device to network |
| Packet | Network | Data unit for transmission |
| Frame | Data Link | Encapsulated packet for transmission |
| Router | Network | Packet forwarding across networks |

এগুলো হলো Network এর basic building blocks – যেটা Node.js এর networking বুঝতে চাইলে জানা জরুরি।

