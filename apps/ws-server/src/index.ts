import { WebSocketServer } from "ws"

const wss = new WebSocketServer({port: 8400});

wss.on("connection", (ws: any)=>{

     ws.on("message",(message: string)=>{
       console.log("Hello i have get", message)
     })

     
})

console.log("Testing the socket server appp");