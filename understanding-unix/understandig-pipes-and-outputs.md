# Understanding Pipes and Output Redirections

Terminal use করতে গেলে একটা powerful concept হচ্ছে: **pipes (|)** আর **output redirection (`>`, `>>`, `<`)**। চলো এগুলো কে সহজভাবে বোঝার চেষ্টা করি।

---

## 🔹 Output Redirection

### ➤ `>` (Single Redirect)

এইটা দিয়ে তুমি একটা command এর output একটা file এ pathao:

```bash
ls > file-list.txt
```

📌 যদি file না থাকে, create করবে। থাকে, তাহলে **puraton ta replace** করে output likhbe।

### ➤ `>>` (Append)

এটা আগের data রেখে **শেষে নতুন output add** করে:

```bash
echo "New line" >> notes.txt
```

### ➤ `<` (Input Redirect)

File এর ভিতরের content কে **input** হিসেবে pathano হয়:

```bash
sort < numbers.txt
```

---

## 🔹 Standard Streams

Unix এ ৩ ধরণের stream থাকে:

| Stream   | Description     | File Descriptor |
| -------- | --------------- | --------------- |
| `stdin`  | Standard Input  | `0`             |
| `stdout` | Standard Output | `1`             |
| `stderr` | Standard Error  | `2`             |

**Example:**

```bash
cat file.txt > output.txt 2> error.txt
```

এখানে stdout যাবে `output.txt` তে, আর যদি কোনো error হয়, সেটা `error.txt` তে যাবে।

---

## 🔹 Combine stdout and stderr

সব output (normal + error) একসাথে file এ redirect করতে:

```bash
command > all.txt 2>&1
```

বা

```bash
command &> all.txt
```

---

## 🔹 Pipes (`|`)

Pipe হল এক command এর output কে পরের command এর input হিসেবে পাঠানো।

```bash
cat names.txt | grep "John"
```

এখানে `cat` এর output → `grep` এর input।

আরো Example:

```bash
ps aux | grep node | sort -k 3 -nr | head
```

একাধিক command একটার পর একটা chain করা যায়।

---

## 🧠 Practical Use Case:

```bash
cat access.log | grep 500 | wc -l
```

এইটা বলছে:

* `cat access.log`: log file read করো
* `grep 500`: শুধু যেগুলায় 500 আছে
* `wc -l`: কয়টা line (error) হয়েছে সেটা count করো

---

## ✅ Summary

* `>`: overwrite file with output
* `>>`: append output
* `<`: input redirect from file
* `2> file`: error stream redirect
* `|`: pipe one command’s output to another

---

Next time terminal use করবা, এই concepts গুলো use করে real power টা feel করতে পারবা 🚀
