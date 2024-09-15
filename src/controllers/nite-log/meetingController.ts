import {Request, Response} from "express";
import MeetingModel from "../../models/nite-log/MeetingModel";
import {createRandomMeetingCode} from "../../helper/helpers";
import AttendanceListModel from "../../models/nite-log/AttendanceListModel";

const createMeeting = async (req: Request, res: Response) => {
    try {
        const {
            date
        } = req.body;

        const meeting = await MeetingModel.getMeetingByDate(date as Date);
        if (meeting) {
            return res.status(409).json({
                error: "Reunião já cadastrada.",
                meeting: meeting
            });
        }

        const newMeeting = await MeetingModel.createMeeting(date as Date);
        return res.status(201).json(newMeeting);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const addUserToAttendanceList = async (req: Request, res: Response) => {
    try {
        const {
            userId,
            date
        } = req.body;

        const meeting = await MeetingModel.getMeetingByDate(date);
        if (!meeting) {
            return res.status(404).json({error: "Reunião não encontrada"});
        }

        await AttendanceListModel.addUserToAttendanceList(userId, meeting.id);
        return res.status(200).json({message: "Usuário adicionado à lista de presença"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const getMeetingById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({error: "ID inválido."});
        }

        const meeting = await MeetingModel.getMeetingById(id)
        return res.status(200).json(meeting);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const getMeetingWithUserAttendance = async (req: Request, res: Response) => {
    try {
        const date = new Date(req.params.date);

        if (!date) {
            return res.status(400).json({error: "Data não fornecida."});
        }

        const meeting = await MeetingModel.getMeetingWithUserAttendance(date)
        return res.status(200).json(meeting);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const updateMeeting = async (req: Request, res: Response) => {
    try {
        const meetingId = parseInt(req.params.id);
        const {
            meetingFields
        } = req.body;

        await MeetingModel.updateMeeting(meetingId, meetingFields);
        return res.status(200).json({message: "Reunião atualizada com sucesso"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const updateMeetingCode = async (req: Request, res: Response) => {
    try {
        const date = new Date(req.params.date);

        const meeting = await MeetingModel.getMeetingByDate(date);

        const updatedMeeting = {
            meetingCode: createRandomMeetingCode()
        }
        await MeetingModel.updateMeeting(meeting.id, updatedMeeting);

        return res.status(200).json({newMeetingCode: updatedMeeting.meetingCode});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const deleteMeeting = async (req: Request, res: Response) => {
    try {
        const meetingId = parseInt(req.params.id);
        await MeetingModel.deleteMeeting(meetingId);
        return res.status(200).json({message: "Reunião deletada com sucesso"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export {
    createMeeting,
    getMeetingById,
    getMeetingWithUserAttendance,
    addUserToAttendanceList,
    updateMeeting,
    updateMeetingCode,
    deleteMeeting
}