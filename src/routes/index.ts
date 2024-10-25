import {Router} from "express";

import helloRoute from "./general/helloRoute";

// General Routes
import authRoutes from "./general/authRoutes";
import userRoutes from "./general/userRoutes";

// Nite Log Routes
import meetingRoutes from "./nite-log/meetingRoutes";

const router = Router();

export default (): Router => {
    helloRoute(router);
    authRoutes(router);
    userRoutes(router);

    meetingRoutes(router);

    return router;
}