import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/prismaClient";
import { NotFoundError, UnauthorizedError } from "../errorhandlers/client-error";

class UserRepository{
    constructor(){}

    async SignUp(data:any){
        try {
            const hashedPassword = bcrypt.hashSync(data.password, 10);
            const user = await prismaClient.user.create({ data: { name: data.name, email: data.email, password: hashedPassword } });
            const jwtToken = jwt.sign({ id: user.id }, JWT_SECRET);
            console.log("token", jwtToken);
            console.log("User", user);
            return {user, jwtToken};
        } catch (error) {
           console.log("Eoor has occured at user controller");
           throw error;
        }
    }

    async SignIn(data:any){
        try {
            const user = await prismaClient.user.findUnique({where:{email: data.email}});
            if(!user){
                throw new NotFoundError("User is not find in database");
            }
            const isMatchpassword = bcrypt.compareSync(data.password, user.password);
            if(!isMatchpassword){
                throw new UnauthorizedError("Password does't matched");
            }
            const jwtToken = jwt.sign({ id: user?.id }, JWT_SECRET);
            console.log("token", jwtToken);
            console.log("User", user);
            return  {user, jwtToken};
        } catch (error) {
           console.log("Eoor has occured at repository controller");
           throw error;
        }
    }

    async JoinRoom(token:any){
        try { 
           console.log("admin iddd", token);
           const user = jwt.verify(token, JWT_SECRET)
           if(!user) return;
           const parsedData = new URLSearchParams(user);
           const useId = parsedData.get('id');
           const response = await prismaClient.room.create({data:{slug:"web dev cohort", adminid:Number(useId)}});
           return response;
        } catch (error) {
           console.log("Eoor has occured at repository controller");
           throw error;
        }
    }

    async GetRoom(){
        try { 
           const response = await prismaClient.room.findMany();
           return response;
        } catch (error) {
           console.log("Eoor has occured at repository controller");
           throw error;
        }
    }

}


export {
    UserRepository
}