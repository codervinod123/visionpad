import { ChatServices } from "../services";
const chatServices = new ChatServices();


export const ReadMessages = async (req: any, res: any) => {
    try {
        const roomid = req.query.roomid;
        const response = await chatServices.ReadMessage(roomid); 
        res.status(200).json({
            message: "chat messages extracted successfully",
            chat: response,
        });
    } catch (error) {
        res.status(400).json({
            message:"can't signin successfully",
            err: error
        })
    }
}
