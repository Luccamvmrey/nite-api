import {Router} from "express";
import {
    createMeeting, deleteMeeting,
    getMeetingWithUserAttendance,
    getMeetingById, updateMeetingCode,
    updateMeeting, addUserToAttendanceList, finishUserAttendance
} from "../../controllers/nite-log/meetingController";

export default (router: Router) => {
    router.post("/meetings", createMeeting);
    router.post("/meetings/user", addUserToAttendanceList);
    router.post("/meetings/user/finish", finishUserAttendance);
    router.get("meetings/:id", getMeetingById);
    router.get("/meetings/by-date/:date", getMeetingWithUserAttendance);
    router.put("/meetings/:id", updateMeeting);
    router.put("/meetings/:date/update-code", updateMeetingCode);
    router.delete("/meetings/:id", deleteMeeting);
}