import { prismaClient } from "@repo/db/prismaClient";

class ChatRepository{
    constructor(){}

    async ReadMessage(roomId:any){
        try {
            const response = await prismaClient.chat.findMany({where:{roomId:Number(roomId)}});
            return response;
        } catch (error) {
           console.log("Eoor has occured while fetching the chats");
           throw error;
        }
    }

}

export {
    ChatRepository
}