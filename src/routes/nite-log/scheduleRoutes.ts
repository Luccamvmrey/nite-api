import {Router} from "express";
import {createSchedule, deleteSchedule, updateSchedule} from "../../controllers/nite-log/scheduleController";

export default (router: Router) => {
    router.post("/schedule", createSchedule);
    router.put("/schedule/:scheduleId", updateSchedule);
    router.delete("/schedule/:scheduleId", deleteSchedule);
}