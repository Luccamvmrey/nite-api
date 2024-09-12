import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
const Meeting = prisma.meeting;

export default class MeetingModel {
    static async createMeeting(meeting: any) {
        // Implement createMeeting
    }

    static async getMeetingById(id: number) {
        // Implement getMeetingById
    }

    static async getMeetingByDate(date: Date) {
        // Implement getMeetingByDate
    }

    static async getMeetingWithUserAttendance(date: Date) {
        // Implement getMeetingWithUserAttendance
    }

    static async updateMeeting(id: number, meetingFields: {}) {
        // Implement updateMeeting
    }

    static async deleteMeeting(id: number) {
        // Implement deleteMeeting
    }
}