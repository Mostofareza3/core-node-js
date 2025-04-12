# Node.js File System (fs) Module

এই নোটে Node.js এর File System module (fs) নিয়ে বাস্তব জীবনে প্রায় ৯০% সময়ে কাজে লাগবে এমন গুরুত্বপূর্ণ বিষয়গুলো আলোচনা করা হয়েছে।

## 📂 File কী?
- File মানে হচ্ছে একধরনের *bit sequence*।
- কম্পিউটারের সবকিছুই কোন না কোন ফাইল হিসেবে সংরক্ষিত থাকে।
- পুরো মেমোরি/হার্ডড্রাইভে শুধুই 0 আর 1 থাকে—যেগুলো কোনো না কোনো ফাইলের ডেটা।

## ⚙️ Node.js কীভাবে File এর সাথে কাজ করে?
- Node.js সরাসরি হার্ডড্রাইভ অ্যাক্সেস করতে জানে না।
- সে *system call* (যেমন: `open()`, `read()`, `write()`) ব্যবহার করে।
- Node.js এই কাজগুলো করে `libuv` লাইব্রেরির মাধ্যমে।
- `libuv` এর ভেতরে আছে `Thread Pool`—যেটা CPU-intensive কাজগুলো asynchronous ভাবে পরিচালনা করে।

## 🛠️ ফাইল Read/Write করার তিনটা উপায়

### 1. Promise-based API ✅ (Most Recommended)
```js
import { readFile } from 'fs/promises';
const data = await readFile('file.txt', 'utf-8');
```

### 2. Callback-based API (Some Use-cases)
```js
import { readFile } from 'fs';
readFile('file.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### 3. Synchronous API ❌ (Avoid if possible)
```js
import { readFileSync } from 'fs';
const data = readFileSync('file.txt', 'utf-8');
```
> ⚠️ Synchronous API পুরো application কে block করে রাখে।

## 🤔 কোনটা ব্যবহার করা উচিত?
- ৯০% সময় `Promise-based API` ব্যবহার করাই উত্তম।
- `Callback` API এখনো অনেক লাইব্রেরি বা পুরনো কোডে থাকে, তাই শিখে রাখা ভালো।
- `Synchronous API` শুধুমাত্র তখনই ব্যবহার করতে হয় যখন শুরুতেই blocking করে কিছু ডেটা পড়তে হয় (যেমন: config file)।

## 🧵 Real Life Use Case
- ফাইল আপলোড করার সময় যদি `Sync` API ব্যবহার করা হয়, তাহলে পুরো সার্ভার ব্লক হয়ে যাবে।
- তাই সবসময় asynchronous API ব্যবহার করাই উচিত।

## 📚 আরো গুরুত্বপূর্ণ বিষয়
- `fs.existsSync()` ডিপ্রিকেটেড। এর বদলে `fs.access()` বা `fs.stat()` ব্যবহার করা উচিত।
- ফাইল stream করে পড়তে হলে `fs.createReadStream()` ব্যবহার করা হয়।
- Directory তৈরি, ফাইল ডিলিট করা, permission চেক করা, সব কিছুর জন্য আলাদা আলাদা method আছে (যেমন: `mkdir`, `unlink`, `chmod`, etc.)।



# Key Operations in the Node.js fs (File System) Module

## File System (fs) Module in Node.js

Node.js provides a core module called `fs` (File System), which is used to interact with the file system of your computer. You can perform many operations like reading, writing, updating, and deleting files and directories.

### Operations you can perform using fs module:

1. **Reading Files**
   - `fs.readFile()`: Asynchronously reads the content of a file.
   - `fs.readFileSync()`: Synchronously reads the content of a file.

2. **Writing to Files**
   - `fs.writeFile()`: Asynchronously writes data to a file.
   - `fs.writeFileSync()`: Synchronously writes data to a file.
   - `fs.appendFile()`: Asynchronously appends data to a file.

3. **File Stats**
   - `fs.stat()`: Asynchronously retrieves the status of a file.
   - `fs.fstat()`: Retrieves the status of a file descriptor.
   - `fs.lstat()`: Retrieves status information about a symbolic link.

4. **Deleting Files**
   - `fs.unlink()`: Asynchronously deletes a file.
   - `fs.unlinkSync()`: Synchronously deletes a file.

5. **File and Directory Creation**
   - `fs.mkdir()`: Asynchronously creates a new directory.
   - `fs.mkdirSync()`: Synchronously creates a new directory.
   - `fs.rmdir()`: Asynchronously removes an empty directory.
   - `fs.rmdirSync()`: Synchronously removes an empty directory.

6. **Checking if File/Directory Exists**
   - `fs.existsSync()`: Checks if a file or directory exists synchronously.
   - `fs.access()`: Checks if the file is accessible.

7. **Watching Files and Directories**
   - `fs.watch()`: Watches a file or directory for changes asynchronously.
   - `fs.watchFile()`: Watches a file for changes using polling.
   
8. **File Descriptors**
   - `fs.open()`: Opens a file and returns a file descriptor.
   - `fs.close()`: Closes the file descriptor.

9. **Renaming Files**
   - `fs.rename()`: Renames a file or directory.
   - `fs.renameSync()`: Renames a file or directory synchronously.

10. **Directory Operations**
    - `fs.readdir()`: Reads the contents of a directory asynchronously.
    - `fs.readdirSync()`: Reads the contents of a directory synchronously.

11. **Streams with fs**
    - `fs.createReadStream()`: Creates a readable stream for a file.
    - `fs.createWriteStream()`: Creates a writable stream for a file.

12. **Handling Errors**
    - Use the callback function to handle errors when performing file operations.

### Advantages of Using fs Module:

1. **Asynchronous Operations**: The fs module provides asynchronous methods (e.g., `fs.readFile()`), which prevent blocking the event loop. This is crucial for performance in web applications, allowing the server to handle multiple tasks at once.

2. **Synchronous Operations**: The fs module also provides synchronous methods (e.g., `fs.readFileSync()`), useful in certain scenarios like scripts or when you need to ensure an operation completes before moving on.

3. **Ease of Use**: The fs module is simple to use for basic file operations, whether it's reading, writing, or manipulating files.

4. **Stream Support**: It provides stream functionality (e.g., `fs.createReadStream()`) for efficiently handling large files without loading the entire file into memory, which is beneficial for performance.

### Which fs Operation Should You Use?

- **Asynchronous Operations** are generally recommended for non-blocking tasks, especially in I/O-bound applications like web servers.
  
- **Synchronous Operations** may be suitable for scripts or situations where blocking is acceptable.

- **Use Streams**: When dealing with large files, streams are the most efficient approach, as they read/write data chunk by chunk.

### File System in Real-Life Applications:

- **Web Servers**: File handling (e.g., saving logs, reading configuration files, etc.) is essential for server-side operations.
  
- **Logging**: Real-time logs are saved asynchronously without blocking the application using the fs module.
  
- **File Uploads**: Handling file uploads, writing them to disk, and providing access to them can be efficiently done with streams.

---

Now you have an updated, readable guide on how to use the fs module in Node.js, which covers the most commonly used functions and scenarios. Let me know if you need anything else!