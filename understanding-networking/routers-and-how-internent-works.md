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