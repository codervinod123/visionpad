import express from "express";
import { userRouter } from "./user";
import { chatRouter } from "./chat";


const apiRoutes:any = express.Router();

apiRoutes.use("/user", userRouter);
apiRoutes.use("/chat", chatRouter);


export {apiRoutes}