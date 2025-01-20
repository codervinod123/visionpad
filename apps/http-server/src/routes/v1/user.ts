import express from "express"
import { SignIn, SignUp, JoinRoom, GetRoom } from "../../controllers";

const userRouter:any = express.Router();


userRouter.post("/signup", SignUp);
userRouter.post("/signin", SignIn);
userRouter.post("/joinroom", JoinRoom);
userRouter.get("/rooms", GetRoom);

export {userRouter};