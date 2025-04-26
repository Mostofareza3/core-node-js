

# 🌐 HTTP MIME Type (Media Type) — Explained in Bangla-English Mix

---

## 📌 MIME Type / Media Type কি?

**MIME = Multipurpose Internet Mail Extensions**

Web e কোনো file বা data browser/server কে ঠিক ভাবে বোঝাতে হলে, আমরা একটা *content type* declare করি। এই content type ই হলো MIME type।

> Example: `text/html`, `application/json`, `image/png` etc.

---

## ❓ কবে MIME type use হয়?

MIME type declare করা হয় HTTP header এ, content এর nature বোঝানোর জন্য।

### 👉 Server → Client:
```http
Content-Type: application/json

এতে Browser/Client বুঝে নেয় response এর body টা কী ধরণের data — HTML? JSON? Image?

⸻

📥 Client → Server:

Client ও request pathাতে MIME type দিতে পারে:

Content-Type: application/x-www-form-urlencoded
Content-Type: multipart/form-data
Content-Type: application/json

🧠 এভাবে Server বুঝে নেয়, user কী data পাঠাচ্ছে।

⸻

📦 Structure of MIME Type

type/subtype

Example:

Type	Subtype	Meaning
text	html	HTML Document
text	plain	Plain Text
application	json	JSON Data
image	png	PNG Image
audio	mpeg	Audio File
video	mp4	MP4 Video
multipart	form-data	For file upload



⸻

🎯 Common MIME Types

MIME Type	Description
text/html	HTML Webpage
application/json	JSON Data
application/javascript	JS Files
text/css	CSS Stylesheet
image/jpeg	JPG Image
image/png	PNG Image
audio/mpeg	MP3 Audio
video/mp4	MP4 Video
application/pdf	PDF File
multipart/form-data	File Upload Form



⸻

🧪 Real World Example (Node.js)

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Hello World</h1>');
});
server.listen(3000);

🧠 Browser এখন বুঝবে এটা একটা HTML page.

⸻

🧭 MIME Type এর Class (Type)

MIME Types are categorized under few Media Type Classes:

Class (Type)	Use
text/	Human readable text
image/	Image files (jpeg, png, etc)
audio/	Audio files
video/	Video files
application/	Program-specific data (json, pdf, octet-stream)
multipart/	Mixed contents, mostly for forms
message/	For email/message formats
font/	Fonts like woff, ttf
model/	3D models, etc



⸻

📌 MIME Type এর importance

✅ Helps browser decide what to do with a response
✅ Server validation for uploads
✅ Content negotiation
✅ Secure communication (prevent wrong interpretation)

⸻

🧨 Bonus Tip: Unknown Type?

Use: application/octet-stream → generic binary stream

⸻

🔚 Summary
	•	MIME Type বোঝায় content এর type
	•	HTTP header এ set হয় Content-Type
	•	দুই দিকে use হয়: server→client & client→server
	•	Human + machine বুঝতে পারে data টা কেমন
	•	MIME class/type/subtype বুঝে data handle করে browser/API

---