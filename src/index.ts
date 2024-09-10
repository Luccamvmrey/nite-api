import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import logger from "morgan";

import routes from "./routes";

const app = express();

app.use(logger("dev"));
app.use(cors({credentials: true}));
app.use(compression());
app.use(bodyParser.json());

app.use("/", routes());

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    console.log("http://localhost:3000")
})
