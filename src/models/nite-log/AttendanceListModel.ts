import {PrismaClient} from '@prisma/client';
import {formatTime} from "../../helper/helpers";
import UserModel from "../general/UserModel";

const prisma = new PrismaClient();
const AttendanceList = prisma.attendanceList;

export default class AttendanceListModel {
    static async addUserToAttendanceList(userId: number, meetingId: number) {
        const formattedTime = formatTime();

        await UserModel.updateUser(userId, {
            isOnAttendance: true,
        })
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

        await UserModel.updateUser(userId, {
            isOnAttendance: false,
        })
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

    static async getSingleAttendance(userId: number, meetingId: number) {
        return AttendanceList.findUnique({
            where: {
                id: {
                    userId: userId,
                    meetingId: meetingId
                }
            }
        });
    }
}