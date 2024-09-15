import {Router} from "express";
import {
    createMeeting, deleteMeeting,
    getMeetingWithUserAttendance,
    getMeetingById,
    updateMeeting, updateMeetingCode, addUserToAttendanceList
} from "../../controllers/nite-log/meetingController";

export default (router: Router) => {
    router.post("/meetings", createMeeting);
    router.post("/meetings/user", addUserToAttendanceList);
    router.get("meetings/:id", getMeetingById);
    router.get("/meetings/by-date/:date", getMeetingWithUserAttendance);
    router.put("/meetings/:id", updateMeeting);
    router.put("/meetings/:date/update-code", updateMeetingCode);
    router.delete("/meetings/:id", deleteMeeting);
}