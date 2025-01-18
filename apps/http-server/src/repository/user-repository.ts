import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/prismaClient";

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
    
}


export {
    UserRepository
}