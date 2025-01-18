import { UserServices } from "../services";

const userServices = new UserServices();

export const SignUp = async (req: any, res: any) => {
    try {
        const data = req.body;
        const user = await userServices.SignUp(data); 
        res.status(200).json({
            message: "signup successfully",
            user: user,
        });
    } catch (error) {
      console.log("Eoor has occured at user controller");
      throw error;
    }
}

export const SignIn = async (req: any, res: any) => {
    try {
        const data = req.body;
        const user = await userServices.SignIn(data); 
        res.status(200).json({
            message: "signin successfully",
            user: user,
        });
    } catch (error) {
      console.log("Eoor has occured at user controller");
      throw error;
    }
}

