import {prismaClient} from "@repo/db/prismaClient";

export const SignUp= async (req:any, res:any)=>{
    const data = req.body;
    console.log("user", data);
    const user = await prismaClient.user.create({data:{name:data.name, email:data.email, password: data.password}});
    res.status(200).json({
        message: "signup successfully",
        user: user
    });
}