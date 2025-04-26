

# 🌐 Understanding HTTP Methods (Bangla-English Mix)

---

## 🧠 HTTP Method কী?

HTTP method মানে হলো server কে request করার সময় — তুমি বলতে পারো:
"ভাই, আমি কি করতে চাই?"

Each HTTP method server কে বলে:

- Data চাই?
- Data বানাতে চাই?
- Data Update করতে চাই?
- Data Delete করতে চাই?

---

## 🔥 Idempotency Concept

**Idempotency** = "এক কাজ একবার বা হাজারবার করলেও একই ফলাফল আসবে"

> Simple: যদি multiple time request পাঠাও, same result থাকবে।

---

### 🧩 Idempotent Example:

- `deleteFileOverOneGigabyte()`
  - যদি ১বার delete করো, file মুছে যাবে।
  - আবার delete করলে আর কিছু হবে না।
  - **✅ Idempotent**

- `deleteBiggestFile()`
  - প্রতিবার call করলে biggest file খুঁজে খুঁজে delete করবে।
  - আলাদা file delete হতে পারে।
  - **❌ Not Idempotent**

---

## 📜 Main HTTP Methods

| Method | Purpose | Request Body | Response Body | Idempotent |
|--------|---------|--------------|---------------|------------|
| GET | Data Request | No | Yes | Yes |
| POST | Create Resource / Perform Action | Yes | Yes | No |
| PUT | Create or Fully Update | Yes | Optional | Yes |
| PATCH | Partial Update | Yes | Optional | No |
| DELETE | Remove Resource | Optional | Optional | Yes |
| HEAD | Like GET but no body (only headers) | No | No | Yes |
| OPTIONS | Ask server what methods are allowed | No | Optional | Yes |

---

## 🏗️ Details of Methods:

### ✅ GET
- Server থেকে **data আনো**।
- Body পাঠানো হয় না।
- Response এ data আসে।
- **Idempotent** (একই request একাধিক বার করলেও result same থাকে।)

```bash
GET /api/users



⸻

✅ POST
	•	Server এ নতুন resource create করো বা action perform করো।
	•	Body থাকে।
	•	Response body থাকতে পারে।
	•	Not Idempotent (দুবার POST করলে দুইটা resource create হতে পারে।)

POST /api/users
Body: { "name": "John" }



⸻

✅ PUT
	•	Server এ পুরো resource create বা replace করো।
	•	Body থাকে।
	•	Response optional।
	•	Idempotent (একই data দিয়ে PUT করলে বারবার same effect.)

PUT /api/user/123
Body: { "name": "Jane" }



⸻

✅ PATCH
	•	Resource এর partial update।
	•	Body থাকে।
	•	Response optional।
	•	Not Idempotent (depnds on implementation, but usually not pure idempotent.)

PATCH /api/user/123
Body: { "name": "UpdatedName" }



⸻

✅ DELETE
	•	Server থেকে resource delete করো।
	•	Body থাকতে পারে বা নাও পারে।
	•	Idempotent (একবার delete করলে, পরে আর delete করার কিছু থাকে না।)

DELETE /api/user/123



⸻

✅ HEAD
	•	GET এর মতো — শুধু header আনে, body আনেনা।
	•	Useful to check resource exists বা not without downloading.

HEAD /api/user/123



⸻

✅ OPTIONS
	•	Server কে জিজ্ঞেস করো:
	•	“এই URL এ কোন কোন HTTP method support করে?”
	•	Mainly CORS (Cross-Origin Resource Sharing) এর context এ use হয়।

OPTIONS /api/user/123



⸻

🔥 Extra HTTP Methods (Less Common but Useful)

Method	Description
CONNECT	Establish a tunnel (Proxy/SSL communication setup)
TRACE	Diagnostic method (loopback test)
PROPFIND	Used in WebDAV, to fetch properties of resources
COPY	Copy a resource (WebDAV)
MOVE	Move a resource (WebDAV)



⸻

🧊 Real Life Example (POST vs PUT):
	•	POST /users → Create new user.
(New ID generated automatically.)
	•	PUT /users/123 → Overwrite user with ID 123.
(Resource fully updated বা নতুন বানানো হবে।)

⸻

🧠 Quick Mnemonic:

Method	Action Word
GET	“Give me”
POST	“Create this”
PUT	“Replace this”
PATCH	“Update this piece”
DELETE	“Remove this”



⸻

🔚 Summary:
	•	HTTP methods = human + machine understandable way to communicate.
	•	Idempotent method = multiple request এ same result (like GET, PUT, DELETE).
	•	POST = mostly non-idempotent (new resource create করে)।
	•	CORS, preflight request এর context এ OPTIONS/HEAD important.

⸻

