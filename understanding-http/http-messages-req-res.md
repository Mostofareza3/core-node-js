HTTP Messages, Request & Response

HTTP communication মূলত হয় দুই পক্ষের মধ্যে:
	•	HTTP Client → যেমন browser, Postman
	•	HTTP Server → যেমন Node.js server, Apache, Nginx

⸻

TCP Connection First! ⚡

HTTP Client এবং Server একে অপরের সাথে communicate করার আগে প্রথমে TCP connection establish করতে হয়।

Step:
	1.	Client → Server কে request করে TCP connection এর জন্য
	2.	TCP Handshake সফল হলে → Data পাঠানো শুরু হয় (HTTP message)

⸻

HTTP Message Structure

Client → Server: HTTP Request
	1.	Request Method → যেমন GET, POST, PUT, DELETE
	2.	Headers → Meta info (Content-Type, Authorization etc)
	3.	Body → Actual data (json, form data etc)
	4.	Chunks → Body বড় হলে client body কে ছোট ছোট chunk এ ভাগ করে পাঠায়
	•	শেষ chunk এ mention থাকে এটা last chunk

Example:

POST /api/user HTTP/1.1
Host: example.com
Content-Type: application/json
Content-Length: 49

{
  "name": "Hasib",
  "email": "hasib@email.com"
}



⸻

Server → Client: HTTP Response
	1.	Status Line → যেমন HTTP/1.1 200 OK
	2.	Headers → যেমন Content-Type, Content-Length, Set-Cookie
	3.	Body → Server response data
	4.	Chunks → Server বড় data হলে chunk আকারে পাঠাতে পারে (chunked encoding)

Example:

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 35

{
  "message": "User created successfully"
}



⸻

Request vs Response Summary

Direction	Message Type	Contains
Client → Server	Request	Method, Headers, Body
Server → Client	Response	Status, Headers, Body



⸻

Chunked Transfer Encoding (Bonus)
	•	যখন body অনেক বড় হয়, তখন পুরো body একবারে না পাঠিয়ে, ছোট ছোট chunk করে পাঠানো হয়
	•	প্রতিটা chunk এর size mention করা থাকে
	•	শেষে একটা 0 size chunk পাঠানো হয় যা বলে body শেষ

⸻

Node.js Example (Request Listener):

const http = require('http');

const server = http.createServer((req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', () => {
    console.log('Request Body:', body);
    res.end('Received');
  });
});

server.listen(3000);



⸻

Recap:
	•	TCP connection ছাড়া HTTP কাজ করে না
	•	Client → Request পাঠায়
	•	Server → Response দেয়
	•	Data বড় হলে chunk করে পাঠানো হয়

⸻
