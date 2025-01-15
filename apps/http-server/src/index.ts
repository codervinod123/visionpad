import express from "express";
import {CreateUserSchema} from "@repo/common/types";
import {PORT} from "@repo/backend-common/config"

const app = express();
app.listen(PORT,()=>{
   CreateUserSchema();
   console.log(`Server is running on PORT ${PORT}`);
})

