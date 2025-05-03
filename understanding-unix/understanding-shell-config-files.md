# 🐚 Understanding Shell Config Files

Unix Shell চালু হলে, সেটা *কোন ধরনের Shell* তার উপর নির্ভর করে কোন কোন config file execute হবে। মুলত 2টা ভিন্ন জিনিস থাকে:

---

## 🔹 Shell কি Login Shell না Non-login Shell?

* **Login Shell:** যখন user terminal session-এ login করে — যেমন `ssh` দিয়ে remote machine এ ঢোকা।
* **Non-login Shell:** GUI terminal emulator দিয়ে shell open করা (GNOME Terminal), অথবা already logged-in state থেকে terminal চালানো।

---

## 🔹 Shell কি Interactive না Non-interactive?

* **Interactive Shell:** যেটা user এর input নেয় — কমান্ড লিখি, execute করি।
* **Non-interactive Shell:** script execution বা automation (যেমন `bash myscript.sh`) — user এর সাথে interaction হয় না।

---

## 🔸 Combination Example:

| Shell Type   | Login? | Interactive? | Example                       |
| ------------ | ------ | ------------ | ----------------------------- |
| SSH Terminal | ✅      | ✅            | ssh দিয়ে remote system access |
| GUI Terminal | ❌      | ✅            | GNOME/Konsole/VSCode Terminal |
| Shell Script | ❌      | ❌            | `bash myscript.sh`            |

---

## 🔹 Non-login & Non-interactive হলে কী হয়?

→ কোনো shell config file execute হয় না।

---

## ⚙️ Bash Config File Execution Order

**Login Shell হলে:**

1. `/etc/profile`
2. `~/.bash_profile` বা `~/.bash_login` বা `~/.profile` (যেটা আগে পায়)
3. `~/.bashrc` ← সাধারণত এখানে shell aliases, prompt config, custom commands থাকে।

➡️ সাধারণভাবে `.bash_profile` থেকে `.bashrc` কে source করা হয়:

```bash
if [ -f ~/.bashrc ]; then
  source ~/.bashrc
fi
```

---

## ⚙️ Zsh Config File Execution Order

**Login Shell হলে:**

1. `/etc/zprofile` → System-level
2. `~/.zprofile` → User-level login shell config
3. `~/.zshrc` → Interactive shell config
4. `~/.zlogin` → Login shell শেষ হলে run হয়
5. `~/.zlogout` → Shell বন্ধ হৱার সময় run হয়

---

## 🧠 Summary:

* Login/Non-login, Interactive/Non-interactive — এগুলোর উপর নির্ভর করে কোন shell config file run হবে।
* Shell environment customize করতে `.bashrc`, `.zshrc` সবচেয় বেশি ব্যবহার হয়।
* Automation ও scripting বুঝতে হলে এসব file এর behavior জানা দরকার।

---
