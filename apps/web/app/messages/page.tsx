"use client"
import axios from "axios";
import { useEffect } from "react";
const Messages = () => {
   
    useEffect(()=>{
       getMessages();
    },[]);

    const getMessages=async()=>{
        const data = await axios.get("http://localhost:3100/api/v1/chat/messages?roomid=2");
        console.log("Data from backend", data.data);
    }

  return (
    <div style={{ height:"100vh", width:"100vw", margin:"20px", display:"flex",flexDirection:"column", gap:"10px", justifyContent:"center", alignItems:"center"}}>
          <div style={{height:"80vh", width:"100vw", display:"flex", flexDirection:"column", overflowY:"auto" , border:"1px solid red"}}>
             {
                Array.from({length:30}).map((_, index)=>{return <span key={index}>hii</span>})
             }
          </div>
         <div style={{width:"100%", border:"1px solid white"}}>
          <input style={{padding:"5px", width:"100%"}} type="text" />
         </div>
    </div>
  );
};

export default Messages;
