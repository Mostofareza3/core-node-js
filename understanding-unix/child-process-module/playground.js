import { spawn, exec } from "node:child_process"

const subprocess = spawn("ls")

subprocess.stdout.on("data", (data) => {
    // console.log(data.toString("utf-8"))
})

// exec
exec("ls -l", (error, stdout, stderr)=>{
    if(error){
        console.error(error)
        return
    }
    console.log("stdout:>>", stdout)
    console.log("stderr:>>",stderr)
})