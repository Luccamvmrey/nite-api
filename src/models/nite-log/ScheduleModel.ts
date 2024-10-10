import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const Schedule = prisma.schedule;

type ScheduleType = {
    dayOfWeek: number,
    startTime: string,
    endTime: string,
}

export default class ScheduleModel {
    static async createSchedule(userId: number, schedule: ScheduleType) {
        return Schedule.create({
            data: {
                user: {
                    connect: {
                        id: userId,
                    },
                },
                ...schedule,
            },
        });
    }

    static async updateSchedule(scheduleId: number, fields: {}) {
        return Schedule.update({
            where: {
                id: scheduleId,
            },
            data: fields
        });
    }

    static async deleteSchedule(scheduleId: number) {
        await Schedule.delete({
            where: {
                id: scheduleId,
            },
        });
    }
}