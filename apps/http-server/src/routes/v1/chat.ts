import express from "express"
import { ReadMessages } from "../../controllers";


const chatRouter:any = express.Router();


chatRouter.get("/messages", ReadMessages);


export {chatRouter};