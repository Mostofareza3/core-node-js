# What Happens to TCP Connection After Message Exchange?

HTTP communication এর পরে TCP connection এর কী হয়? এটাই আমরা এই note-এ clear করবো।

---

## 🔄 Message Exchange sesh hole TCP connection er ki hoy?

যখন HTTP client ও server message exchange (request-response) complete করে:

- Default behaviour → **TCP connection close হয়ে যায়**।
  
  কারণ HTTP 1.0 এ প্রতিটা request এর জন্য আলাদা TCP connection establish হতো। এটা inefficient।

---

## 🔁 কিন্তু TCP connection কি বার বার খুলে বন্ধ করতে হবে?

না! আমরা চাইলে **TCP connection alive রাখতে পারি**, যেনো পরবর্তী request গুলো একই connection এর মাধ্যমে যেতে পারে। এভাবে:

- Time & resource save হয়
- Latency কমে

---

## ✅ কিভাবে TCP connection Alive রাখা যায়?

**HTTP Header:**
```http
Connection: keep-alive
```

### Keep-Alive মানে:
- TCP connection একবার open হলে তা কিছুক্ষণ open থাকবেই
- Multiple HTTP requests/responses একই TCP connection এর উপর যেতে পারবে
- Client অথবা server চাইলে connection close করতে পারে

---

## ⛔ যদি Close করতে চাই?

তাহলে simply header-এ বলবো:
```http
Connection: close
```

### Example (HTTP 1.1):
```
GET /index.html HTTP/1.1
Host: example.com
Connection: keep-alive
```

---

## 🧠 Recap:

| কাজ | কি হচ্ছে |
|-----|------------|
| Request-response শেষ | TCP connection by default close হয়ে যায় |
| যদি চাও alive রাখতে | `Connection: keep-alive` ব্যবহার করো |
| Close করতে চাও | `Connection: close` পাঠাও |

---

## ⚙️ Bonus: HTTP Versions & Keep-Alive

| HTTP Version | Behaviour |
|--------------|-----------|
| HTTP/1.0 | Default: Connection close, manually keep-alive পাঠাতে হয় |
| HTTP/1.1 | Default: Connection keep-alive, manually close পাঠাতে হয় |
| HTTP/2 | Single connection দিয়ে multiple parallel request যায় |

---
