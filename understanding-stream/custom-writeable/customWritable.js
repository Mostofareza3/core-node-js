import { Writable } from "node:stream"
import fs from "fs"

class FileWriteableStream extends Writable {
    constructor({ highWaterMark, fileName}){
        super({highWaterMark});
        this.fileName = fileName;
        //file descriptor
        this.fd=null;
        this.chunks=[];
        this.chunkSize=0;
        this.writeCount = 0;
    }

    // This will run after the constructor and it will put off all calling the other methods until we call the callback function
    _construct(callback){
        fs.open(this.fileName, 'w', (err, fd)=>{
            if (err){
                // so if we call the callback with an argument, it means that we have an error 
                // and we should no proceed
                callback(err)
            }else{
                this.fd = fd
                // no argument means it was successfull
                callback()
            }
        })
    }

    _write(chunk, encoding, callback){
        // do something
        this.chunks.push(chunk);
        this.chunkSize += chunk.length;

        if(this.chunkSize > this.writableHighWaterMark){
            fs.write(this.fd, Buffer.concat(this.chunks), (err)=>{
                if(err){
                    return callback(err)
                }else{
                    this.chunks = [];
                    this.chunkSize=0
                    ++this.writeCount;
                    callback()
                }
            })
        }else{
            callback()
        }
    }

    _final(callback){
        fs.write(this.fd, Buffer.concat(this.chunks), (err)=>{
            if (err) return callback(err)
            this.chunks = []
            callback()
        })
    }

    _destroy(err, callback){
        console.log("Number of writes:", this.writeCount)
        if(this.fd){
            fs.close(this.fd, (error)=>{
                callback(err || error)
            })
        }else{
            callback(err)
        }
    }
}

const stream = new FileWriteableStream({highWaterMark: 1800, fileName: "text.txt"});
stream.write(Buffer.from("This is some string"))
stream.end(Buffer.from("Last write"))