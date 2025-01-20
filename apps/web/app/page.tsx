"use client"
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation'


const page = () => {

  const router = useRouter()
  const [room, setRoom] = useState("");

  const joinRoom=async()=>{
      const roomDetails = await axios.post(`http://localhost:3100/api/v1/user/joinroom?roomId=${room}`);
      console.log("Room joined", roomDetails);
      router.push(`/chat/${room}`);
  }

  return (
    <div style={{ height:"100vh", width:"100vw", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <div style={{ display:"flex", justifyItems:"center", alignItems:"center", gap:"10px" }}>
          <input value={room} onChange={(e)=>setRoom(e.target.value)} style={{padding:"5px", outline:"none"}} type="text" />
          <Link href={`/chat/${room}`}>
            <button onClick={joinRoom} style={{padding:"8px 20px", background:"green", borderRadius:"5px", border:"none", cursor:"pointer"}}>Join</button>
          </Link>
        </div>
    </div>
  )
}

export default page