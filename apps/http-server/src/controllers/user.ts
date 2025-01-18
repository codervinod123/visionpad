import {prismaClient} from "@repo/db/prismaClient";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import bcrypt from "bcrypt";

export const SignUp= async (req:any, res:any)=>{
    const data = req.body;
    console.log("user", data);
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    const user = await prismaClient.user.create({data:{name:data.name, email:data.email, password: hashedPassword}});
    const jwtToken = jwt.sign({id:user.id}, JWT_SECRET);
    res.status(200).json({
        message: "signup successfully",
        user: user,
        token: jwtToken
    });
}