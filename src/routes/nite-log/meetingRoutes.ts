import {Router} from "express";
import {
    createMeeting, deleteMeeting,
    getMeetingByDate,
    getMeetingById,
    updateMeeting
} from "../../controllers/nite-log/meetingController";

export default (router: Router) => {
    router.post("/meetings", createMeeting);
    router.get("meetings/:id", getMeetingById);
    router.get("/meetings/by-date/:date", getMeetingByDate);
    router.put("/meetings/:id", updateMeeting);
    router.delete("/meetings/:id", deleteMeeting);
}