import {Request, Response} from "express";
import ScheduleModel from "../../models-prisma/nite-log/ScheduleModel";

const createSchedule = async (req: Request, res: Response) => {
    try {
        const {
            userId,
            schedule,
        } = req.body;

        if (!userId || !schedule) {
            return res.status(400).json({
                error: "Parâmetros inválidos."
            });
        }

        const createdSchedule = await ScheduleModel.createSchedule(userId, schedule);
        return res.status(201).json(createdSchedule);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const updateSchedule = async (req: Request, res: Response) => {
    try {
        const scheduleId = parseInt(req.params.scheduleId);
        if (!scheduleId) {
            return res.status(400).json({
                error: "ID inválido."
            });
        }

        const fields = req.body;
        const updatedSchedule = await ScheduleModel.updateSchedule(scheduleId, fields);
        return res.status(200).json(updatedSchedule);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const deleteSchedule = async (req: Request, res: Response) => {
    try {
        const scheduleId = parseInt(req.params.scheduleId);
        if (!scheduleId) {
            return res.status(400).json({
                error: "ID inválido."
            });
        }

        await ScheduleModel.deleteSchedule(scheduleId);
        return res.status(204);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export {
    createSchedule,
    updateSchedule,
    deleteSchedule,
}