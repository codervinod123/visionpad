import { ChatRepository } from "../repository";
const chatRepository = new ChatRepository();

class ChatServices{
    constructor(){}

    async ReadMessage(roomid:any){
       try {
          const response = await chatRepository.ReadMessage(roomid);
          return response;
       } catch (error) {
         console.log("Eoor has occured at user controller");
         throw error;
       } 
    }

};

export {
    ChatServices
}