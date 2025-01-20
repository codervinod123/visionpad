"use client"
import axios from "axios";
import { useEffect , useState} from "react";
const Messages = () => {
   
    const [ws, setWs] = useState<any | null>(null);
    const [message, setMessage] = useState<string>("");
    useEffect(()=>{
       getMessages();
    },[]);

    const getMessages=async()=>{
        const data = await axios.get("http://localhost:3100/api/v1/chat/messages?roomid=2");
        console.log("Data from backend", data.data);
    }

    // creating connection to the websocket server
    useEffect(()=>{
        cwssConnection();
    },[])
    
    const cwssConnection=async ()=>{
        console.log(localStorage.getItem("room"));
        const wss = new WebSocket(`ws://localhost:8100?userid=${localStorage.getItem("token")}`);
        setWs(wss);
    }



   const sendMessage=()=>{
        ws.send(JSON.stringify({
            "type":"chat",
            "message":message, 
            "roomid":localStorage.getItem("room")}));
   }

  return (
    <div style={{ height:"100vh", width:"100vw", margin:"20px", display:"flex",flexDirection:"column", gap:"10px", justifyContent:"center", alignItems:"center"}}>
          <div style={{height:"80vh", width:"100vw", display:"flex", flexDirection:"column", overflowY:"auto" , border:"1px solid red"}}>
             {
                Array.from({length:30}).map((_, index)=>{return <span key={index}>hii</span>})
             }
          </div>
         <div style={{width:"100%", border:"1px solid white"}}>
          <input onChange={(e)=>setMessage(e.target.value)} value={message} style={{padding:"5px", width:"100%"}} type="text" />
          <button onClick={sendMessage}>Send Mssage</button>
         </div>
    </div>
  );
};

export default Messages;
