import {Router} from "express";
import {createSchedule, deleteSchedule, updateSchedule} from "../../controllers/nite-log/scheduleController";

export default (router: Router) => {
    router.post("/schedules", createSchedule);
    router.put("/schedules/:scheduleId", updateSchedule);
    router.delete("/schedules/:scheduleId", deleteSchedule);
}