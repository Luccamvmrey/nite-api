import {PrismaClient} from '@prisma/client';
import {formatTime} from "../../helper/helpers";

const prisma = new PrismaClient();
const AttendanceList = prisma.attendanceList;

export default class AttendanceListModel {
    static async addUserToAttendanceList(userId: number, meetingId: number) {
        const formattedTime = formatTime();

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
                },
                startTime: formattedTime,
                endTime: null
            }
        });
    }

    static async finishAttendance(userId: number, meetingId: number) {
        const formattedTime = formatTime();

        return AttendanceList.update({
            where: {
                id: {
                    userId: userId,
                    meetingId: meetingId
                }
            },
            data: {
                endTime: formattedTime
            }
        });
    }
}