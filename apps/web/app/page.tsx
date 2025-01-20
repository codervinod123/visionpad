import React from 'react';
import Link from 'next/link';


const page = () => {

 

  return (
    <div style={{ height:"100vh", width:"100vw", display:"flex", gap:"10px", justifyContent:"center", alignItems:"center"}}>
       <Link href="/signin">
         <button style={{padding:"8px 20px", background:"green", borderRadius:"5px", border:"none", cursor:"pointer"}}>Sign in</button>
       </Link>
       <Link href="/signup">
         <button style={{padding:"8px 20px", background:"green", borderRadius:"5px", border:"none", cursor:"pointer"}}>Sign up</button>
       </Link>
    </div>
  )
}

export default page