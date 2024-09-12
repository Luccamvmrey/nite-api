import {PrismaClient} from '@prisma/client';
import {createRandomMeetingCode} from "../../helper/helpers";

const prisma = new PrismaClient();
const Meeting = prisma.meeting;

export default class MeetingModel {
    static async createMeeting(date: Date) {
        return Meeting.create({
            data: {
                meetingCode: createRandomMeetingCode(),
                date: date
            }
        })
    }

    static async getMeetingById(id: number) {
        return Meeting.findUnique({
            where: {
                id: id
            }
        })
    }

    static async getMeetingByDate(date: Date) {
        return Meeting.findFirst({
            where: {
                date: date
            }
        })
    }

    static async getMeetingWithUserAttendance(date: Date) {
        return Meeting.findFirst({
            where: {
                date: date
            },
            include: {
                attendanceList: true
            }
        })
    }

    static async updateMeeting(id: number, meetingFields: {}) {
        await Meeting.update({
            where: {
                id: id
            },
            data: meetingFields
        })
    }

    static async deleteMeeting(id: number) {
        await Meeting.delete({
            where: {
                id: id
            }
        })
    }
}