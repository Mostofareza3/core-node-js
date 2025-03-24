# Node.js EventEmitter

## ১. EventEmitter কী?
**EventEmitter** হল Node.js এর একটি **core module**, যা **event-driven architecture** হ্যান্ডেল করতে সাহায্য করে। এটি **events emit (প্রেরণ)** এবং **events listen (শোনা)** করতে ব্যবহৃত হয়।

## ২. কেন দরকার?
Node.js **asynchronous এবং non-blocking** হওয়ায় আমাদের অনেক সময় **callback functions** ব্যবহার করতে হয়। তবে, যদি অনেক callback চেইন হয়ে যায়, তাহলে **callback hell** তৈরি হতে পারে। এই সমস্যা সমাধানের জন্য **EventEmitter** ব্যবহার করা হয়।

## ৩. EventEmitter কী সমস্যার সমাধান করে?
- **Callback Hell কমায়** → একাধিক asynchronous কাজ সহজভাবে ম্যানেজ করা যায়।
- **Custom Events তৈরি করা যায়** → আমরা নিজস্ব events তৈরি করে সেগুলো **emit & listen** করতে পারি।
- **Loose Coupling নিশ্চিত করে** → বিভিন্ন মডিউল বা ফাংশন একে অপরের সাথে শক্তভাবে সংযুক্ত না হয়ে **events** এর মাধ্যমে যোগাযোগ করে।

## ৪. EventEmitter এর Example
### Basic Example
```js
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Event listener
myEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

// Event emit
myEmitter.emit('greet', 'Mostofa');
```
### Output:
```
Hello, Mostofa!
```

### Real-life Example: Order Processing System
```js
const EventEmitter = require('events');
class OrderSystem extends EventEmitter {
    placeOrder(order) {
        console.log(`Order placed: ${order}`);
        this.emit('orderReceived', order);
    }
}

const myOrder = new OrderSystem();

// Event Listener
myOrder.on('orderReceived', (order) => {
    console.log(`Processing order: ${order}`);
});

myOrder.on('orderReceived', (order) => {
    console.log(`Sending confirmation for order: ${order}`);
});

// Emit Event
myOrder.placeOrder('Laptop');
```
### Output:
```
Order placed: Laptop
Processing order: Laptop
Sending confirmation for order: Laptop
```

## ৫. EventEmitter এর কিছু গুরুত্বপূর্ণ মেথড
| Method | Description |
|--------|------------|
| `on(event, listener)` | ইভেন্ট শোনার জন্য ব্যবহৃত হয় |
| `emit(event, ...args)` | ইভেন্ট ট্রিগার করার জন্য ব্যবহৃত হয় |
| `once(event, listener)` | শুধুমাত্র একবার ইভেন্ট শোনার জন্য ব্যবহৃত হয় |
| `removeListener(event, listener)` | নির্দিষ্ট লিসেনার রিমুভ করার জন্য ব্যবহৃত হয় |
| `removeAllListeners(event)` | সকল লিসেনার রিমুভ করার জন্য ব্যবহৃত হয় |

## ৬. সংক্ষেপে
- **EventEmitter** হল Node.js এর **built-in module**, যা **event-driven programming** সহজ করে।
- **Custom events** তৈরি করে **emit & listen** করা যায়।
- **Loose coupling নিশ্চিত করে**, যাতে কোড আরও **maintainable** হয়।
- **Multiple listeners** ব্যবহার করা যায় এক ইভেন্টের জন্য।

