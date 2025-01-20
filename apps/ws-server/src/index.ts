import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import {prismaClient} from "@repo/db/prismaClient";

const wss = new WebSocketServer({port:8100});

interface User{
   userId:   string | null,
   rooms:    number[],
   ws:       WebSocket
};

const users:User[]=[];

const sendMessage=async(parsedMessage:any, ws:any, userId:any)=>{
 
 if( parsedMessage.type === "join_room" ){
    
  console.log("Joining rooomm");
  const response = await prismaClient.room.create({
    data:{
      slug: "fff",
      adminid: Number(userId)
    }
   });
   console.log("room details", response);
   if(!response) return;
   const user = users.find(user=>user.userId==userId);
   user?.rooms.push(response.id);
 }

 if( parsedMessage.type === "leave_room" ){
   const user = users.find(user=>user.ws===ws);
   if(!user) return;
   user.rooms = user.rooms.filter(room=>parsedMessage.roomid != room);
 }


 if( parsedMessage.type === "chat" ){
   const user = users.find(user=>user.ws===ws);
   if(!user) return;
   user.rooms.map((roomid)=>{
       users.map((user)=>{
           if(user.rooms.includes(roomid)){
             user.ws.send(parsedMessage.message);
           }
       })
   });
   
   const response = await prismaClient.chat.create({
      data:{
        message:  parsedMessage.message,
        roomId:   Number(parsedMessage.roomid),
        senderId: Number(userId)
      }
   });
   console.log(response);

 }
  
}

wss.on("connection", function connection(ws:WebSocket, request){
    const urlParams = new URLSearchParams(request?.url?.split("?")[1]);
    const token = urlParams.get("userid")
    if(!token) return
    const data = jwt.verify(token, "vinodpr");
    if(!data) return;
    const parassss =new URLSearchParams(data);
    const userId = parassss.get("id");
    
    users.push({
      userId: userId,
      rooms: [],
      ws: ws
    });

    ws.on("message", (message)=>{
       const parsedMessage = JSON.parse(message.toString());
       sendMessage(parsedMessage, ws, userId);
    })

})
