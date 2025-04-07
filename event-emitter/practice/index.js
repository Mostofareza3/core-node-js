const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();
const myEmitter = new EventEmitter()


function event1 (){
    console.log("prepare routine!")
}

function event2(){
    console.log("Do other tasks")
}

eventEmitter.on("e1", event1)
eventEmitter.on("e2", event2)


eventEmitter.emit("e1")
eventEmitter.off("e2",event2)


myEmitter.on('status', (code, msg)=> console.log(`Got ${code} and ${msg}`));
myEmitter.emit("status",200, 'ok')


// Listener count
console.log(myEmitter.listenerCount('eventOne'));
console.log(eventEmitter.listenerCount("e1"))



// Example 6— Getting Raw Listeners
console.log(eventEmitter.rawListeners('e1'));


// Example 7— Async Example demo
class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    this.emit('begin');
    console.time('execute');
    this.on('data', (data)=> console.log('got data ', data));
    asyncFunc(...args, (err, data) => {
      if (err) {
        return this.emit('error', err);
      }
      this.emit('data', data);
      console.timeEnd('execute');
      this.emit('end');
    });
  }
}

class WithAPICall extends EventEmitter {

    execute (func, ...args){
        this.emit("begin")
        console.time('execute')
        this.on('data', (data)=> console.log('got data', data))
        func(...args, (err, data)=>{
            if (err){
                return this.emit('error', err)
            }
            this.emit('data', data)
            console.timeEnd('execute');
            this.emit('end');
        })
    }
}

// Using the withAPI call
const withAPI = new WithAPICall();
withAPI.on('begin', console.log('about to execute'));
withAPI.on('end', ()=> console.log('done with execute'))
const apiCall = (url, cb) => {
    fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        cb(null, data);
      });
}
withAPI.execute(apiCall, 'https://jsonplaceholder.typicode.com/posts/2')


// Using the withTime event emitter:

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

const readFile = (url, cb) => {
  fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
      cb(null, data);
    });
}

withTime.execute(readFile, 'https://jsonplaceholder.typicode.com/posts/1');
