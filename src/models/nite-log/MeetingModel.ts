import {PrismaClient} from '@prisma/client';
import {createRandomMeetingCode, formatDate} from "../../helper/helpers";

const prisma = new PrismaClient();
const Meeting = prisma.meeting;

export default class MeetingModel {
    static async createMeeting(date: string) {
        const formattedDate = formatDate(date);

        return Meeting.create({
            data: {
                meetingCode: createRandomMeetingCode(),
                date: formattedDate,
                attendanceList: {}
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

    static async getMeetingByDate(date: string) {
        const formattedDate = formatDate(date);

        return Meeting.findFirst({
            where: {
                date: formattedDate
            }
        })
    }

    static async getMeetingWithUserAttendance(date: string) {
        const formattedDate = formatDate(date);

        return Meeting.findFirst({
            where: {
                date: formattedDate
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
