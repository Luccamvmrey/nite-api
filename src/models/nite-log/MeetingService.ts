import CRUDService from "../CRUDService";
import {Meeting} from "../types";
import {createRandomMeetingCode, formatDate, formatTime} from "../../helper/helpers";
import UserService from "../general/UserService";

export default class MeetingService extends CRUDService<Meeting> {
    private userService = new UserService();

    constructor() {
        super("meetings");
    }

    async createMeeting(date: string) {
        const formattedDate = formatDate(date);
        return this.create({date: formattedDate, meetingCode: createRandomMeetingCode()});
    }

    async getMeetingByDate(date: string) {
        const formattedDate = formatDate(date);
        const [meeting] = await this.getByField("date", formattedDate);
        return meeting;
    }

    async updateMeetingCode(date: string) {
        const meeting = await this.getMeetingByDate(date);
        const updatedMeeting = {
            meetingCode: createRandomMeetingCode()
        }
        return this.update(meeting.id, updatedMeeting);
    }

    async addUserToAttendanceList(meetingId: string, userId: string) {
        const startTime = formatTime();
        await this.userService.update(userId, {isOnAttendance: true});
        const meeting = await this.getById(meetingId);
        meeting.attendanceList.push({userId, startTime, endTime: null});
        return this.update(meetingId, {attendanceList: meeting.attendanceList});
    }

    async finishUserAttendance(meetingId: string, userId: string) {
        const endTime = formatTime();
        await this.userService.update(userId, {isOnAttendance: false});
        const meeting = await this.getById(meetingId);
        meeting.attendanceList.find((a) => a.userId === userId).endTime = endTime;
        return this.update(meetingId, {attendanceList: meeting.attendanceList});
    }
}