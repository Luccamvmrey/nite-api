import {Request, Response} from "express";
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
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

const updateSchedule = async (req: Request, res: Response) => {
    try {
        const {scheduleId, userId} = req.params;
        if (!scheduleId || !userId) {
            res.status(400).json({
                error: "ID inválido."
            });
        }

        const fields = req.body;
        await userService.updateSchedule(userId, scheduleId, fields);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteSchedule = async (req: Request, res: Response) => {
    try {
        const {scheduleId, userId} = req.params;
        if (!scheduleId || !userId) {
            res.status(400).json({
                error: "ID inválido."
            });
        }

        await userService.deleteSchedule(userId, scheduleId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export {
    createSchedule,
    updateSchedule,
    deleteSchedule,
}