import express from "express";
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import logger from "morgan";

const app = express();

app.use(logger("dev"));
app.use(cors({credentials: true}));
app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server is running on port 8080");
    console.log("http://localhost:8080/")
})
