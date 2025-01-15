import express from "express";
import {CreateUserSchema} from "@repo/common/types";
import {PORT} from "@repo/backend-common/config"
import {prisma} from "@repo/db/prisma"
import cors from "cors"
import { appRoutes } from "./routes";
import bodyParser from "body-parser";

const app = express();
app.use(cors());

app.use("/api", appRoutes);

app.listen(PORT,async()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
   console.log(`Server is running on PORT ${PORT}`);
})

