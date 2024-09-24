import {Router} from "express";

import helloRoute from "./general/helloRoute";

// General Routes
import authRoutes from "./general/authRoutes";
import hierarchyRoutes from "./general/hierarchyRoutes";
import userRoutes from "./general/userRoutes";

// Nite Log Routes
import meetingRoutes from "./nite-log/meetingRoutes";

const router = Router();

export default (): Router => {
    helloRoute(router);
    authRoutes(router);
    userRoutes(router);
    hierarchyRoutes(router);

    meetingRoutes(router);

    return router;
}