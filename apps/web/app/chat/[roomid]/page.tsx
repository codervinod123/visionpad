"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';


const page = ({ params }: any) => {


  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();
  }, [])

  const getRooms = async () => {
    const response = await axios.get("http://localhost:3100/api/v1/user/rooms");
    setRooms(response.data.rooms);
    console.log(response.data.rooms);
  }

  return (
    <div style={{ display: "flex", flexWrap:"wrap", padding: "50px", justifyContent:"center", gap: "1em" }}>
      { rooms &&
        rooms.map((room:any, index) => {
          return (
            <div key={index} style={{ height: "200px", width: "200px", border: "1px solid white", borderRadius: "5px", background: "#4C585B", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <span>{room.slug}</span>
              <button style={{ padding: "8px 20px", background: "green", borderRadius: "5px", border: "none", cursor: "pointer", margin: "10px" }}>Join</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default page