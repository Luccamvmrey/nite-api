import {Request, Response} from "express";
import MeetingService from "../../models/nite-log/MeetingService";

const meetingService = new MeetingService();

const createMeeting = async (req: Request, res: Response) => {
    try {
        const {
            date
        } = req.body;

        const meeting = await meetingService.getMeetingByDate(date);
        if (meeting) {
            res.status(409).json({error: "Reunião já cadastrada.", meeting: meeting});
        }

        const newMeeting = await meetingService.createMeeting(date);
        res.status(201).json(newMeeting);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const addUserToAttendanceList = async (req: Request, res: Response) => {
    try {
        const {
            userId,
            date,
            meetingCode
        } = req.body;

        const meeting = await meetingService.getMeetingByDate(date);
        if (!meeting) {
            res.status(404).json({error: "Reunião não encontrada"});
        }

        if (meeting.attendanceList.find((a) => a.userId === userId)) {
            res.status(409).json({error: "Usuário já cadastrado na lista de presença"});
        }

        if (meeting.meetingCode !== meetingCode) {
            res.status(403).json({error: "Código de reunião inválido"});
        }

        await meetingService.addUserToAttendanceList(meeting.id, userId);
        res.status(200).json({message: "Usuário adicionado à lista de presença"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const finishUserAttendance = async (req: Request, res: Response) => {
    try {
        const {
            userId,
            date
        } = req.body;

        const meeting = await meetingService.getMeetingByDate(date);
        if (!meeting) {
            res.status(404).json({error: "Reunião não encontrada"});
        }

        await meetingService.finishUserAttendance(userId, meeting.id);
        res.status(200).json({message: "Presença finalizada"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getMeetingById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        if (!id) {
            res.status(400).json({error: "ID inválido."});
        }

        const meeting = await meetingService.getById(id)
        res.status(200).json(meeting);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getMeetingWithUserAttendance = async (req: Request, res: Response) => {
    try {
        const {date} = req.params;

        if (!date) {
            res.status(400).json({error: "Data não fornecida."});
        }

        const meeting = await meetingService.getMeetingByDate(date);
        res.status(200).json(meeting);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateMeeting = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {meetingFields} = req.body;

        await meetingService.update(id, meetingFields);
        res.status(200).json({message: "Reunião atualizada com sucesso"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateMeetingCode = async (req: Request, res: Response) => {
    try {
        const {date}= req.params;

        const updatedMeeting = await meetingService.updateMeetingCode(date);

        res.status(200).json({newMeetingCode: updatedMeeting.meetingCode});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteMeeting = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await meetingService.delete(id);
        res.status(200).json({message: "Reunião deletada com sucesso"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export {
    createMeeting,
    getMeetingById,
    getMeetingWithUserAttendance,
    addUserToAttendanceList,
    finishUserAttendance,
    updateMeeting,
    updateMeetingCode,
    deleteMeeting
}