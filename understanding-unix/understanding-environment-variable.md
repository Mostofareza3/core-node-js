# 🌿 Understanding Environment Variables

Environment Variable (পরিবেশ ভেরিয়েবল) হলো—
👉 shell বা প্রোসেস এর context-এর কিছু key-value data
👉 যেগুলো execution time এ accessible হয়

---

## 🧠 Why Do We Need Environment Variables?

আমরা চাই:

* Dynamic ভাবে কিছু configuration handle করতে
* Production / Development আলাদা value রাখতে
* Password, Secret Token, API Key secure রাখতে
* Server restart না দিয়ে change করতে

---

## 🗃️ কিছু Common Environment Variable:

| Variable       | Description                                      |
| -------------- | ------------------------------------------------ |
| `PATH`         | কোথা থেকে command খুজবে                          |
| `HOME`         | user এর home directory                           |
| `USER`         | current username                                 |
| `PORT`         | কন অ্যাপে কোন port এ চলবে                        |
| `NODE_ENV`     | current environment: `development`, `production` |
| `DATABASE_URL` | DB connection string                             |

---

## 👨‍💻 Usage in Node.js

```js
console.log(process.env.NODE_ENV);
```

```bash
NODE_ENV=production node app.js
```

🔐 Sensitive info `.env` ফাইলে রেখে load করা যায় dotenv দিয়ে:

```bash
# .env file
API_KEY=super-secret-key
```

```js
// app.js
require('dotenv').config();
console.log(process.env.API_KEY);
```

---

## 🧪 How to Set Environment Variables?

### Linux/Mac:

```bash
export PORT=5000
node server.js
```

### Windows (cmd):

```cmd
set PORT=5000
node server.js
```

---

## 📦 Best Practices

✅ Secrets কে `.env` ফাইলে রেখো, `.gitignore` করে দাও
✅ Default fallback দিয়ো:

```js
const port = process.env.PORT || 3000;
```

✅ Production-এ shell বা cloud env var manager use করো
✅ শুধু configuration-related value রাখো, logic না

---

## 📜 Real-World Examples

1. 🌐 Hosting on Render/Netlify:

   * UI থেকে API keys বা PORT configure করা হয়

2. 🔐 MongoDB credentials বা payment gateway secret

---

## 📾 Summary

* Env var = external config (key-value form)
* Process level এ available হয়
* Dynamic + Secure config-এর জন্য essential
* `.env` file দিয়ে manage করা যায়

---
