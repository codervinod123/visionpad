import express from "express"
import { SignUp } from "../../controllers";

const userRouter:any = express.Router();


userRouter.post("/signup", SignUp);

export {userRouter};