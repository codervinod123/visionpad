import express from "express"
import { SignIn, SignUp, JoinRoom } from "../../controllers";

const userRouter:any = express.Router();


userRouter.post("/signup", SignUp);
userRouter.post("/signin", SignIn);
userRouter.post("/joinroom", JoinRoom);

export {userRouter};