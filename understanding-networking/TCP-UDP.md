# TCP vs UDP (Node.js Context)

## TCP কি?
TCP মানে **Transmission Control Protocol**। এটা একটি **connection-oriented** protocol, অর্থাৎ ডেটা পাঠানোর আগে দুই device এর মধ্যে একটা connection establish হয়।

### Key Features:
- Reliable (ডেটা ঠিকমতো পৌঁছায়)
- Ordered (যেভাবে পাঠাও, ঠিক সেভাবে পৌঁছায়)
- Error checking (corruption হলে detect করে)
- Slow but safe

---

## UDP কি?
UDP মানে **User Datagram Protocol**। এটা একটি **connectionless** protocol, অর্থাৎ কোনো connection establish না করেই ডেটা পাঠিয়ে দেয়।

### Key Features:
- Unreliable (গ্যারান্টি নাই যে ডেটা পৌঁছাবে)
- No ordering
- No error checking
- Very fast

---

## TCP vs UDP: পার্থক্য

| Feature | TCP | UDP |
|--------|-----|-----|
| Connection | আছে (Handshake লাগে) | নেই |
| Reliability | Reliable | Unreliable |
| Ordering | Ordered delivery | No order guarantee |
| Speed | Slow (due to reliability) | Fast |
| Use Case | Data accuracy দরকার হলে | Speed বেশি দরকার হলে |
| Header Size | বড় | ছোট |
| Congestion Control | আছে | নেই |

---

## TCP কীভাবে কাজ করে?

TCP ডেটা পাঠানোর আগে **3-way handshake** করে:
1. Client → SYN → Server
2. Server → SYN-ACK → Client
3. Client → ACK → Server

তারপর ডেটা পাঠানো শুরু হয়:
- ডেটা টুকরা করে পাঠানো হয় (Segmentation)
- প্রতিটি segment acknowledgment সহ পাঠানো হয়
- Lost হলে resend হয়

### Example:
```text
Client: আমি তোমাকে data পাঠাতে চাই (SYN)
Server: ঠিক আছে, আমি রেডি (SYN-ACK)
Client: ঠিক আছে, আমি শুরু করছি (ACK)
```

---

## UDP কীভাবে কাজ করে?

UDP কোনো handshake করে না। ডেটা just পাঠিয়ে দেয় –
- No connection
- No acknowledgement
- No resend

### Example:
```text
Client: Data পাঠিয়ে দিলাম, যে পাইসে পাইসে!
```

---

## TCP দিয়ে বানানো যায় এমন Application:

1. **Web Browser** → HTTP/HTTPS TCP এর উপর কাজ করে
2. **Email (SMTP, IMAP)**
3. **File Transfer (FTP)**
4. **Database Communication (MongoDB, MySQL)**

TCP দরকার যেখানে:
- Accuracy দরকার
- ডেটা order এ দরকার
- Error handling দরকার

---

## UDP দিয়ে বানানো যায় এমন Application:

1. **Video/Audio Streaming** → Netflix, YouTube
2. **VoIP (Voice over IP)** → Zoom, Skype, WhatsApp Call
3. **Online Gaming** → Fast response দরকার
4. **DNS (Domain Name Resolution)**

UDP দরকার যেখানে:
- Speed important
- কিছু packet হারালেও সমস্যা নেই

---

## Node.js Context:
Node.js তে তুমি `net` module দিয়ে TCP socket বানাতে পারো এবং `dgram` module দিয়ে UDP socket handle করতে পারো।

---



# TCP vs UDP (Node.js Context)

## TCP কি?
TCP মানে **Transmission Control Protocol**। এটা একটি **connection-oriented** protocol, অর্থাৎ ডেটা পাঠানোর আগে দুই device এর মধ্যে একটা connection establish হয়।

### Key Features:
- Reliable (ডেটা ঠিকমতো পৌঁছায়)
- Ordered (যেভাবে পাঠাও, ঠিক সেভাবে পৌঁছায়)
- Error checking (corruption হলে detect করে)
- Slow but safe

---

## UDP কি?
UDP মানে **User Datagram Protocol**। এটা একটি **connectionless** protocol, অর্থাৎ কোনো connection establish না করেই ডেটা পাঠিয়ে দেয়।

### Key Features:
- Unreliable (গ্যারান্টি নাই যে ডেটা পৌঁছাবে)
- No ordering
- No error checking
- Very fast

---

## TCP vs UDP: পার্থক্য

| Feature | TCP | UDP |
|--------|-----|-----|
| Connection | আছে (Handshake লাগে) | নেই |
| Reliability | Reliable | Unreliable |
| Ordering | Ordered delivery | No order guarantee |
| Speed | Slow (due to reliability) | Fast |
| Use Case | Data accuracy দরকার হলে | Speed বেশি দরকার হলে |
| Header Size | বড় | ছোট |
| Congestion Control | আছে | নেই |

---

## TCP কীভাবে কাজ করে?

TCP ডেটা পাঠানোর আগে **3-way handshake** করে:
1. Client → SYN → Server
2. Server → SYN-ACK → Client
3. Client → ACK → Server

তারপর ডেটা পাঠানো শুরু হয়:
- ডেটা টুকরা করে পাঠানো হয় (Segmentation)
- প্রতিটি segment acknowledgment সহ পাঠানো হয়
- Lost হলে resend হয়

### Example:
```text
Client: আমি তোমাকে data পাঠাতে চাই (SYN)
Server: ঠিক আছে, আমি রেডি (SYN-ACK)
Client: ঠিক আছে, আমি শুরু করছি (ACK)
```

---

## UDP কীভাবে কাজ করে?

UDP কোনো handshake করে না। ডেটা just পাঠিয়ে দেয় –
- No connection
- No acknowledgement
- No resend

### Example:
```text
Client: Data পাঠিয়ে দিলাম, যে পাইসে পাইসে!
```

---

## TCP দিয়ে বানানো যায় এমন Application:

1. **Web Browser** → HTTP/HTTPS TCP এর উপর কাজ করে
2. **Email (SMTP, IMAP)**
3. **File Transfer (FTP)**
4. **Database Communication (MongoDB, MySQL)**

TCP দরকার যেখানে:
- Accuracy দরকার
- ডেটা order এ দরকার
- Error handling দরকার

---

## UDP দিয়ে বানানো যায় এমন Application:

1. **Video/Audio Streaming** → Netflix, YouTube
2. **VoIP (Voice over IP)** → Zoom, Skype, WhatsApp Call
3. **Online Gaming** → Fast response দরকার
4. **DNS (Domain Name Resolution)**

UDP দরকার যেখানে:
- Speed important
- কিছু packet হারালেও সমস্যা নেই

---

## Node.js Context:
Node.js তে তুমি `net` module দিয়ে TCP socket বানাতে পারো এবং `dgram` module দিয়ে UDP socket handle করতে পারো।

---

