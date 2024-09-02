import {Router} from "express";
import authRoutes from "./general/auth/authRoutes";

const router = Router();

export default (): Router => {
    authRoutes(router);

    return router;
}