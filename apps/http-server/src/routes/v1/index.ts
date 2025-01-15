import express from "express";

const apiRoutes:any = express.Router();

apiRoutes.post("/user/signup", (req:any, res:any)=>{
    const user = req.body;
    console.log("user data is", req.body);
    res.status(200).json({
        message: "Successfully created user #333",
        user: user
    });
});

export {apiRoutes}