import {Router} from "express";
import {
    deleteUser,
    getUserById,
    getUserBySessionToken,
    getUsers,
    updateUser
} from "../../controllers/general/userController";
import {createSchedule, deleteSchedule, updateSchedule} from "../../controllers/nite-log/scheduleController";

export default (router: Router) => {
    router.get("/users", getUsers);
    router.get("/users/:userId", getUserById);
    router.get("/users/session/:sessionToken", getUserBySessionToken);
    router.put("/users/:userId", updateUser);
    router.delete("/users/:userId", deleteUser);

    router.post("/users/:userId/schedules", createSchedule);
    router.put("/users/schedules/:scheduleId", updateSchedule);
    router.delete("/users/schedules/:scheduleId", deleteSchedule);
}