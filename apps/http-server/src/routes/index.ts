import express from "express";
import { apiRoutes } from "./v1";
import { chatRouter } from "./v1/chat";

const appRoutes:any = express.Router();

appRoutes.use("/v1", apiRoutes);


export {appRoutes}