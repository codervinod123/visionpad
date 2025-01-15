import express from "express";
import {CreateUserSchema} from "@repo/common/types";
import {PORT} from "@repo/backend-common/config"
import {prisma} from "@repo/db/prisma"

const app = express();
app.listen(PORT,async()=>{
   CreateUserSchema();
   await prisma.user.create({data:{name:"vinit", email:"vinit@gmail.com",password:"vinit@123"}});
   console.log(`Server is running on PORT ${PORT}`);
})

