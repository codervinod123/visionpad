"use client"
import React, {useState} from 'react'
import axios from 'axios';
import { use } from 'react';

const page = ({params}:any) => {

  const [message, setMessage] = useState("");

  return (
    <div style={{display:"flex", flexDirection:"column",}}>
        <div style={{margin:"5px 5px", padding:"5px", display:"flex", flexDirection:"column", height:"80vh", border:"3px solid white", overflowY:"auto"}}>
           {
            Array.from({length:20}).map((_, index)=>{
              return(
                <React.Fragment key={index}>
                  <span style={{padding:"10px"}}>Hello</span>
                </React.Fragment>
              )
            })
           }
        </div>
        <input value={message} onChange={(e)=>setMessage(e.target.value)} style={{margin:"50px 10px", padding:"5px", outline:"none"}} type="text" />
    </div>
  )
}

export default page