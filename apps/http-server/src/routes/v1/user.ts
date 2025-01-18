import express from "express"
import { SignUp } from "../../controllers/user";

const userRouter:any = express.Router();


userRouter.post("/signup", SignUp);

export {userRouter};