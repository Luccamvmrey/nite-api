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

app.listen(3000, "0.0.0.0", () => {
    console.log("Server is running on:");
    console.log("Local:   http://localhost:3000");
    console.log("Network: http://192.168.88.117:3000");
})

export default app;
