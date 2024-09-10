import {Router, Request, Response} from "express";

export default (router: Router) => {
    router.get("/hello", (_: Request, res: Response) => {
        res.status(200).send("Hello World");
    })
}