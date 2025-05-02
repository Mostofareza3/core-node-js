# 🧠 Demystifying Bash Execution Order: Aliases, Functions, Built-ins, and Path

---

## 🔍 যখন তুমি Bash-এ একটা command লিখো, তখন actually bash internally পেছটা জায়গায় খুজে দেখে, এই command টা কে handle করবে?

### ✅ Bash checks in this exact order:

1. **Alias**
2. **Function**
3. **Builtin Command**
4. **Executable from PATH**

---

## 1️⃣ Alias

🔗 Alias হলো shortcut/custom নাম জেটা তুমি define করো:

```bash
alias gs="git status"
```

✅ এখন তুমি `gs` লিখলে, bash আগে alias-এ খুজবে।

🔍 Check aliases:

```bash
alias
type gs
```

---

## 2️⃣ Function

🔧 Function হলো ছোট এটা shell routine জেটা তুমি define করো:

```bash
myFunc() {
  echo "Hello from function!"
}
```

✅ Alias না পেলে bash function list-এ খুজবে।

🔍 Check functions:

```bash
declare -f
type myFunc
```

---

## 3️⃣ Built-in Command

🧱 Bash এর নিজস্ব কিছু command থাকে জেগুলা external program না, বরং shell এর ভিতরের অঙ্শ।

Example:

* `cd`
* `echo`
* `export`
* `read`

🔍 Check built-in:

```bash
type echo
```

---

## 4️⃣ Executable in \$PATH

🚣যদি আগের 3 টায় না পায়, তাহলে bash `$PATH` variable এ define করা directories গুলোতে খুজে দেখে কোনো executable আছে কিনা?

Example:

```bash
/usr/bin/node
/usr/local/bin/npm
```

🔍 Check command location:

```bash
which node
type node
```

---

## 🧪 Real-Life Example:

```bash
alias ls="ls --color=auto"

ls() {
  echo "My custom ls"
}

# এখন তুমি ls লিখলে কি হবে?

# 👉 function override করে alias কে
# So output হবে: "My custom ls"
```

---

## 🔍 Check priority:

```bash
type <command>
```

Output example:

```bash
$ type ls
ls is a function
ls ()
{
  echo "custom ls"
}
```

---

## 💥 Warning:

🔁 যদি তুমি same name use করো alias, function, external command — তাহলে execution order confuse করতে পারে।

✅ তাই override করলে clear ভাবে override করো।

---

## 🔚 Summary:

| Order | Type     | Example          |
| ----- | -------- | ---------------- |
| 1     | Alias    | `alias gs="..."` |
| 2     | Function | `myFunc(){}`     |
| 3     | Built-in | `cd`, `echo`     |
| 4     | Path     | `/usr/bin/ls`    |

🧠 Bash সবসময় এই ক্রমে command খুজে দেখে।
