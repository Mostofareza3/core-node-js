# Understanding IPv4, DNS, IPv6, Loopback, and MAC Address

## IP vs IP Address – আলাদা জিনিস!

- **IP** মানে **Internet Protocol** – এটা একটা rule set যা বলে কিভাবে ডেটা এক device থেকে আরেকটিতে যাবে।
- **IP Address** হল সেই unique number যেটা দিয়ে প্রতিটা device কে identify করা হয় internet/network এর ভেতরে।

---

## IPv4: Internet Protocol Version 4

- **IPv4** address হল **32-bit** সংখ্যা → যেটা ৪টা ভাগে ভাগ করা থাকে, প্রতি ভাগে ৮-bit করে।
- প্রতিটা ভাগ **0 - 255** range এর মধ্যে থাকে।

### Example:
```
Binary: 00011010.00101010.01110110.00001111
Decimal: 26.42.118.15
```

### Special IP addresses:
- `0.0.0.0` → **This device** (unspecified address)
- `255.255.255.255` → **Broadcast address** (সবাইকে পাঠানো হবে)

---

## Subnet Mask

Subnet Mask বলে কোন অংশটা **Network** আর কোনটা **Host**।

### Example:
```
IP Address: 62.37.7.113/24
             ↑     ↑
           Network Host
```
- `/24` মানে প্রথম ২৪টা bit হলো Network, বাকি ৮টা হলো Host

### Subnet Mask এর রূপ:
```
255.255.255.0 (binary: 11111111.11111111.11111111.00000000)
```

---

## Private IPv4 Address

এই address গুলো শুধুমাত্র **local network** এ ব্যবহৃত হয়। Public internet এ access করতে পারে না।

### Private IP Ranges:
- `10.0.0.0` → `10.255.255.255`
- `172.16.0.0` → `172.31.255.255`
- `192.168.0.0` → `192.168.255.255`

### Example:
WiFi router এ তোমার ফোনের IP থাকে `192.168.0.105` — এটা private network এ assign করা।

---

## Loopback Address

Loopback address মানে হলো — নিজেই নিজেকে ping করা।

### Default Loopback:
```
127.0.0.1
```
এটা `localhost` নামেও পরিচিত।

### Use Case:
- Local server test
- Network config check

### Example:
```bash
ping 127.0.0.1
```

---

## MAC Address (Media Access Control)

MAC Address হল hardware level এ প্রতিটি device এর জন্য unique identifier। এটা **NIC (Network Interface Card)** এর সাথে জড়িত থাকে।

### Format:
```
E0:4C:68:1F:AE:32 (Hexadecimal)
```

### Key Point:
- Physical Address → Router বা Switch এই MAC address দেখে frame পাঠায়
- Fixed → সাধারণভাবে change করা যায় না

### MAC vs IP:
| MAC Address | IP Address |
|-------------|-------------|
| Hardware Level | Logical Level |
| Fixed | Dynamically assigned |
| LAN communication | Internet communication |

---

## DNS: Domain Name System

DNS হল একটা system যা **domain name কে IP address এ translate করে**।

### কেন দরকার?
তুমি google.com লিখো, কিন্তু browser তো IP চায়। DNS resolve করে দেয়:
```
google.com → 142.250.190.78
```

### Resolution Steps:
1. Browser checks cache
2. OS checks local DNS
3. Query goes to DNS server
4. DNS server finds the IP and responds

### Node.js Example:
```js
const dns = require('dns');
dns.lookup('google.com', (err, address) => {
  console.log(address); // Prints IP
});
```

---

## IPv6: Future of IP Addressing

- **IPv4 exhausted** → অনেক address already used
- IPv6 হল 128-bit address system → trillions of IP support করে

### Format:
```
2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

### Features:
- More addresses
- Built-in security
- Faster routing

---

## Recap Table:
| Concept | Example | Notes |
|--------|---------|-------|
| IPv4 | 192.168.1.1 | 32-bit, most common |
| IPv6 | 2001:db8::1 | 128-bit, future-ready |
| Subnet Mask | 255.255.255.0 | Network vs Host bits |
| Loopback | 127.0.0.1 | Test local system |
| Private IP | 192.168.x.x | Local network only |
| MAC Address | E0:4C:68:1F:AE:32 | Physical ID of device |
| DNS | google.com → IP | Domain name resolution |

---

Node.js দুনিয়াতে networking ভালো বুঝতে চাইলে এই concepts গুলো foundation। এদের উপর দাঁড়িয়েই socket, protocol, DNS resolve, port binding সব কাজ করে।
