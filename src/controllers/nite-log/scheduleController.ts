import {Request, Response} from "express";
import ScheduleModel from "../../models/nite-log/schedule/ScheduleModel";
import UserService from "../../models/general/UserService";

const userService = new UserService();

const createSchedule = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const {schedule} = req.body;

        if (!userId || !schedule) {
            res.status(400).json({error: "Parâmetros inválidos."});
        }

        await userService.addSchedule(userId, schedule);
        res.status(204).send();
    } catch (error) {

        res.status(500).json({error: error.message});
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
        return res.status(200).send();
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export {
    createSchedule,
    updateSchedule,
    deleteSchedule,
}