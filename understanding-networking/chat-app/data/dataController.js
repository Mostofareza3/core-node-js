import fs from "fs";
import { Buffer } from "buffer";

(async()=>{
    // Create a writable stream to the file
    const fileStream = fs.createWriteStream("data.txt");
    console.time("Writing data");
    
    // Function to write numbers with back-pressure handling
    const writeNumbers = async (start, end) => {
        return new Promise((resolve) => {
            let currentIndex = start;
            
            function writeNext() {
                let ok = true;
                // Using for loop with a limit per batch
                for (let i = 0; currentIndex <= end && ok; i++) {
                    ok = fileStream.write(Buffer.from(` ${currentIndex} `));
                    currentIndex++;
                }
                
                if (currentIndex <= end) {
                    // If we need to wait for drain event
                    fileStream.once('drain', writeNext);
                } else {
                    resolve();
                }
            }
            
            writeNext();
        });
    };
    
    // Write numbers with back-pressure handling
    await writeNumbers(0, 100000000);
    
    // Close the stream when done
    fileStream.end();
    
    console.log("Data writing completed!");
    console.timeEnd("Writing data");
})();