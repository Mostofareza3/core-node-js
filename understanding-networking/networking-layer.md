# Networking Layers (Node.js Context)

কম্পিউটার বা ডিভাইসের মধ্যে যোগাযোগ (Communication) বোঝার জন্য আমরা Networking Model ব্যবহার করি। সবচেয়ে পরিচিত মডেল হলো **OSI Model**। এই মডেলটি ৭টি স্তরে ভাগ করা হয়েছে, কিন্তু এখানে আমরা মূলত ৫টি Key Layer নিয়ে আলোচনা করবো – যেটা **Internet Protocol Suite (TCP/IP Model)** এর context এ বেশি ব্যবহৃত হয়।

---

## ১. Physical Layer (Bits)

এই লেয়ার responsible:
- Electrical signal
- Binary transmission (0s & 1s)

### Example:
- LAN Cable, Wi-Fi signal, Fiber optics ইত্যাদি

### Key Point:
এখানে কেবল raw bit গুলো signal আকারে move করে। কোনো intelligent routing বা addressing নাই।

---

## ২. Data Link Layer (Frames)

এই লেয়ার ডেটাকে **Frame** আকারে পাঠায় এবং local network level communication handle করে।

### Key Features:
- MAC Address ব্যবহৃত হয়
- Error Detection (CRC)
- Switch এই লেয়ার-এ কাজ করে

### Real-life:
যখন একটা কম্পিউটার পাশের কম্পিউটারকে কিছু পাঠায় – তখন এই layer কাজ করে।

---

## ৩. Network Layer (Packets)

এই লেয়ার responsible:
- Routing
- IP Addressing

### Key Component:
- IP Address (IPv4, IPv6)
- Router
- Packet Forwarding

### Example:
একটি packet Bangladesh থেকে USA server এ যাচ্ছে – কোন পথে যাবে সেটা ঠিক করে এই layer।

---

## ৪. Transport Layer (Segments)

এই layer হল **end-to-end communication** এর জন্য responsible।

### Two Protocols:
- **TCP (Transmission Control Protocol):** Reliable, connection-oriented
- **UDP (User Datagram Protocol):** Fast but connectionless (Used in video streaming, gaming)

### Key Concepts:
- Port Number
- Flow Control
- Error Recovery

### Real-life:
Browser থেকে server এ HTML request পাঠানো হয় TCP দিয়ে।

---

## ৫. Application Layer (Data)

এই layer directly **software level** এ কাজ করে। যেটা একজন developer হিসেবে সবচেয়ে গুরুত্বপূর্ণ।

### Examples of Protocols:
- HTTP/HTTPS → Web Browsing
- FTP → File Transfer
- SMTP → Email Sending

### Real-life:
তুমি যখন `fetch()` call দাও বা Express.js দিয়ে API বানাও – তখন তুমি এই Application Layer এর সাথে কাজ করছো।

---

## Summary Table:

| Layer | Data Unit | Key Concept | Example |
|-------|-----------|-------------|---------|
| Physical | Bits | Signal Transmission | LAN Cable, Wi-Fi |
| Data Link | Frames | MAC Address, Switch | Ethernet Communication |
| Network | Packets | IP Address, Router | Routing between cities |
| Transport | Segments | Port, TCP/UDP | Reliable file transfer |
| Application | Data | HTTP, FTP, SMTP | Web Browsing, API |

---

## Developer Perspective:
আমরা Node.js developer হিসেবে সবচেয়ে বেশি কাজ করি **Application Layer** নিয়ে। কিন্তু যদি তুমি low-level networking API বা server/socket programming নিয়ে কাজ করো, তাহলে Transport ও Network layer এর ধারণাও অনেক গুরুত্বপূর্ণ হয়ে যায়।


👉 Next time তুমি যখন `net`, `http`, `dgram`, বা `tls` module নিয়ে কাজ করবা, তখন এই লেয়ার গুলোর concept মাথায় থাকলে বুঝতে অনেক সুবিধা হবে।

---


