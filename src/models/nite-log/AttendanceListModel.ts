import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
const AttendanceList = prisma.attendanceList;

export default class AttendanceListModel {
    static async addUserToAttendanceList(userId: number, meetingId: number) {
        return AttendanceList.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
                meeting: {
                    connect: {
                        id: meetingId
                    }
                }
            }
        });
    }
}