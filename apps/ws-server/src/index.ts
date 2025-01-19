import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken"

const wss = new WebSocketServer({port:8100});

interface User{
   userId:   string | null,
   rooms:    string[],
   ws:       WebSocket
};

const users:User[]=[];

const sendMessage=(parsedMessage:any, ws:any, userId:any)=>{
  if( parsedMessage.type === "join_room" ){
    const user = users.find(user=>user.userId==userId);
    user?.rooms.push(parsedMessage.roomid);
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
   }) 
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

    console.log(users);

    ws.on("message", (message)=>{
       const parsedMessage = JSON.parse(message.toString());
       sendMessage(parsedMessage, ws, userId);
    })

})































// import { WebSocket, WebSocketServer } from "ws"
// const wss = new WebSocketServer({port: 8400});


// interface User{
//   userId:    string,
//   rooms:     string[],
//   ws: WebSocket
// }

// const users:User[]=[];

// wss.on("connection", (ws: WebSocket,  request)=>{

//      const url = request.url;
//      if(!url) return;
     
//      const searchParams =new URLSearchParams(url.split("?")[1]);
//      const userId = searchParams?.get('room') || "";
     
     
//      users.push({
//       userId: userId,
//       rooms:  [],   
//       ws: ws
//     })


//      ws.on("message",(data)=>{
       
//       const parsedData = JSON.parse(data as unknown as string);

//       // if a user wants to join a room
//       if(parsedData.type === "join_room"){
//          users.map((user)=>{
//            if(user.ws==ws){
//             user.rooms.push(parsedData.roomid);
//            }
//          })
//       }

//       if(parsedData.type === "leave_room"){
//         const user = users.find(x=>x.ws===ws);
//         if(!user) return;
//         user.rooms =  user.rooms.filter(room=>parsedData.roomid!=room);
//       }

//       if(parsedData.type === "chat"){
//          users.map((user)=>{
//             user.rooms.map((room)=>{
//                if(room=parsedData.roomid){
//                 user.ws.send(parsedData.message);
//                }
//             })
//          })
//       }


//       console.log("Usersss", users);
      


//      }) 
     
     
// })

// console.log("Testing the socket server appp");