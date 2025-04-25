### An overview of HTTP

#### Components of HTTP-based systems
    - Client: the user-agent
    - The Web server
    - Proxies

### Basic aspects of HTTP
    - HTTP is simple
    - HTTP is extensible
    - HTTP is stateless, but not sessionless
    - HTTP and connections






#### HTTP follows a classical client-server model, with a client opening a connection to make a request, then waiting until it receives a response from the server. HTTP is a stateless protocol, meaning that the server does not keep any session data between two requests, although the later addition of cookies adds state to some client-server interactions.

🔍 বাক্যটা কী বলতেছে?

HTTP follows a classical client-server model,
with a client opening a connection to make a request,
then waiting until it receives a response from the server.

মানে:
	•	HTTP-তে ক্লায়েন্ট (browser, app, etc.) একটা connection খুলে → server এ request পাঠায় (যেমন: “এই file ta dao”)
	•	তারপর ক্লায়েন্ট অপেক্ষা করে, যতক্ষণ না server উত্তর দেয় (response পাঠায়)

HTTP is a stateless protocol,
meaning that the server does not keep any session data between two requests,

মানে:
	•	HTTP stateless → server কোনো আগের request মনে রাখে না
	•	তুমি একবার request দিলে, server response দিয়ে ভুলে যাবে
	•	পরেরবার আরেকটা request দিলে → server আবার নতুনভাবে শুরু করবে, আগেরটা মনে নাই

although the later addition of cookies adds state to some client-server interactions.

মানে:
	•	পরে cookies চালু হয় (browser এ store হয়), যেটা দিয়ে কিছু state মনে রাখা যায়
	•	যেমন: login করে ফেললে cookie তে token বা session ID রেখে দেওয়া যায় → যাতে পরেরবার server বুঝে ফেলে “এই user আগেই login করছিলো”

⸻

🧠 ছোট একটা real-life analogy:

🔸 তুমি একটা দোকানে গেলে বললা: “ভাই ১ কেজি চিনি দেন”
🔸 দোকানদার চিনি দিয়ে দিলো — ব্যস, তোমার আর তার interaction শেষ।
🔸 এরপর তুমি আবার গেলে: “ভাই ১ কেজি চাল দেন” → দোকানদার চিনবে না তুমি আগেও আসছিলে।

এইটাই stateless behavior — server আগের interaction মনে রাখে না।

তবে:
	•	যদি তুমি গিয়ে “ভাই, আমি আগের customer — এই টোকেন দেখেন” বলো (মানে cookie/token দাও),
	•	তখন দোকানদার চিনে ফেলে: “আচ্ছা এইটা আগের login করা user”

এইটাই cookie দিয়ে stateful বানানো।

⸻

✅ সংক্ষেপে:

বিষয়	মানে
Client-server model	Client request পাঠায়, Server response দেয়
Stateless protocol	Server আগের request মনে রাখে না
Cookies	আগের session এর info রেখে দেয় client পাসে → পরে server চিনে ফেলে



┌────────────┐           Request         ┌────────────┐
│   Client   │  ──────────────────────▶  │   Server   │
│ (Browser)  │                           │ (Node.js)  │
└────────────┘   ◀─────────────────────  └────────────┘
                    Response




### Protocol
A protocol is a system of rules that define how data is exchanged within or between computers. Communications between devices require that the devices agree on the format of the data that is being exchanged. The set of rules that defines a format is called a protocol.


### Proxy server
A proxy server is an intermediate program or computer used when navigating through different networks of the Internet. They facilitate access to content on the World Wide Web. A proxy intercepts requests and serves back responses; it may forward the requests, or not (for example in the case of a cache), and it may modify it (for example changing its headers, at the boundary between two networks).


### The Web server
On the opposite side of the communication channel is the server, which serves the document as requested by the client. A server appears as only a single machine virtually; but it may actually be a collection of servers sharing the load (load balancing), or other software (such as caches, a database server, or e-commerce servers), totally or partially generating the document on demand.


📄 মূল লাইনটা কী বলতেছে?

Server মানে কেবল একটাই machine না, বরং অনেকগুলো জিনিস মিলায়া কাজ করে — আর বাইরে থেকে আমরা শুধু একটাকেই দেখি!

⸻

💡 পয়েন্ট বাই পয়েন্ট ব্যাখ্যা:

⸻

1️⃣ “The Web server” মানে শুধু একটা computer না

🧠 আমরা যখন browser এ request পাঠাই (https://example.com),
তখন “server” নামে যাকে ডাকি, সেটা আসলে হয়ত একটার বদলে:
	•	একটা load balancer
	•	২-৩টা backend server
	•	একাধিক cache server
	•	image server
	•	database server
→ সব মিলায়া একটা team এর মতো কাজ করে।

তবুও বাইরে থেকে আমরা শুধু বলি: “server থেকে আসতেছে” 😄

⸻

2️⃣ Load Balancing:

Server গুলা অনেক request পায়। একটা server যদি সব কিছুর ভার নেয়, তাহলে crush করে ফেলবে।

🔹 তাই Load balancer request গুলা ভাগ করে দেয় multiple server এর মাঝে।

🧠 উদাহরণ:
	•	তুমি ঢুকলে → Server A handle করল
	•	আমি ঢুকলে → Server B handle করল
(আমরা জানিও না!)

⸻

3️⃣ Caching & Dynamic Data:

সব কিছু live বানিয়ে পাঠালে দেরি হয় — তাই কিছু জিনিস “আগেই রেডি করে” cache করে রাখা হয়

🔹 Example:
	•	Static HTML / images → Cache থেকে তাৎক্ষণিক পাঠায়
	•	Logged-in user এর personalized dashboard → Backend generate করে পাঠায়

⸻

4️⃣ একই machine এ অনেক server run করতে পারে

🧠 একটা বড় computer এর ভিতরে:
	•	Apache → example.com এর জন্য
	•	Node.js → api.example.com এর জন্য
	•	Nginx → static file serve করতে
→ এরা একসাথে কাজ করে।

⸻

5️⃣ HTTP/1.1 + Host Header দিয়ে একটাই IP তে অনেক site চালানো যায়

🔍 ধরো তোর একটা shared hosting আছে:
	•	example.com
	•	myblog.com
	•	rahimshop.com
→ সব একটাই IP address ইউজ করে।

তাহলে আলাদা কিভাবে চিনে? 🤔

🔹 Host: header দেখে!

Client যখন request পাঠায়, header এর ভিতর বলে দেয় — “আমি example.com এ ঢুকতেছি!”

Server সেই অনুযায়ী জানে, কোনটা serve করতে হবে।

⸻

✅ Bottom Line:

কথা	ব্যাখ্যা
Server = একটাই না	ভেতরে অনেক service/software চালায়
Load balance হয়	একাধিক machine এ ভাগ হয়
Cache & DB যুক্ত	Real-time ও pre-loaded content mix
একই IP তে অনেক site	HTTP/1.1 + Host header magic



⸻

🌐 HTTP Flow (Client → Server)

🛠 Step 1: TCP Connection খোলো

HTTP একটা Application Layer protocol — এর নিচে TCP কাজ করে।

📦 Client যখন কোনো webpage চাই (e.g., GET /), তখন:
	1.	প্রথমে একটা TCP connection খুলে
	2.	এরপর ওই connection দিয়ে HTTP message পাঠায়

💡 এই TCP connection:
	•	নতুন হতে পারে
	•	আগেরটা reuse হতে পারে
	•	অথবা একাধিক connection একসাথে খোলা হতে পারে (high performance এর জন্য)

⸻

📩 Step 2: HTTP Request পাঠায়

HTTP/1.1 এ এটা human-readable হয়, যেমন:

GET / HTTP/1.1
Host: developer.mozilla.org
Accept-Language: fr

🔹 এটা বোঝায়:
“Hi server, আমি এই পেইজটা চাই, আর আমি French language prefer করি!”

⸻

📬 Step 3: Server থেকে HTTP Response আসে

Server reply দেয়:

HTTP/1.1 200 OK
Date: Sat, 09 Oct 2010 14:28:02 GMT
Server: Apache
Content-Length: 29769
Content-Type: text/html

🧠 এর পরে যেটা আসে — ওটাই আসলে HTML page content (<!doctype html>...</html>)

⸻

🔄 Step 4: Connection বন্ধ বা Reuse

Client decide করে:
	•	এই TCP connection বন্ধ করবে?
	•	না হলে, একই connection দিয়ে আরেকটা request পাঠাবে?

🔹 Modern browsers → connection reuse করে efficiency বাড়ায় (persistent connections)

⸻

⚡️ HTTP Pipelining কি?

এটা একটা পুরোনো technique, যেটা HTTP/1.1 এ introduce হয়

🔹 ধারণা ছিল:
	•	একাধিক HTTP request একসাথে পাঠানো যাবে
	•	response গুলা আসবে ordered ভাবে

🎯 Goal ছিল: Faster communication, কম latency

❌ কিন্তু বাস্তবে অনেক network ডিভাইস / server / proxy ঠিকমতো handle করতে পারত না

⸻

🚀 HTTP/2: Multiplexing দিয়ে সমস্যার সমাধান

🔹 HTTP/2 এ একটাই TCP connection এর মধ্যে একাধিক request-response একসাথে চালানো যায়।

🎬 সব কিছু frame আকারে যায়
🎭 প্রতিটা request আলাদা stream এ — তাই “একটার জন্য আরেকটা wait করে না”

👉 Faster, smarter, and more compatible with modern web!

⸻

✅ Summary Table

Step	What Happens
1️⃣	TCP connection খোলা হয়
2️⃣	Client HTTP Request পাঠায়
3️⃣	Server Response দেয় (header + body)
4️⃣	Connection বন্ধ বা reuse হয়
⚠️	HTTP pipelining পুরোনো — HTTP/2 এ multiplexing বেশি efficient



⸻

### APIs based on HTTP

