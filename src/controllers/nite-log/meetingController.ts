import {Request, Response} from "express";
import MeetingModel from "../../models-prisma/nite-log/MeetingModel";
import {createRandomMeetingCode} from "../../helper/helpers";

const createMeeting = async (req: Request, res: Response) => {
    try {
        const {
            date
        } = req.body;

        const meeting = await MeetingModel.getMeetingByDate(date as Date);
        if (meeting) {
            res.status(409).json({
                error: "Reunião já cadastrada."
            });
        }

        const newMeeting = await MeetingModel.createMeeting(date as Date);
        return res.status(201).json(newMeeting).end();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getMeetingById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({error: "ID inválido."});
        }

        if (!id) {
            res.status(400).json({error: "ID não fornecido."});
        }

        const meeting = await MeetingModel.getMeetingById(id)
        res.status(200).json(meeting).end();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getMeetingWithUserAttendance = async (req: Request, res: Response) => {
    try {
        const date = new Date(req.params.date);

        if (isNaN(date.getTime())) {
            res.status(400).json({error: "Data inválida."});
        }

        if (!date) {
            res.status(400).json({error: "Data não fornecida."});
        }

        const meeting = await MeetingModel.getMeetingWithUserAttendance(date)
        res.status(200).json(meeting).end();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateMeeting = async (req: Request, res: Response) => {
    try {
        const meetingId = parseInt(req.params.id);
        const {
            meetingFields
        } = req.body;

        await MeetingModel.updateMeeting(meetingId, meetingFields);
        res.status(200).json({message: "Reunião atualizada com sucesso"}).end();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateMeetingCode = async (req: Request, res: Response) => {
    try {
        const meetingId = parseInt(req.params.id);

        const updatedMeeting = {
            meetingCode: createRandomMeetingCode()
        }
        await MeetingModel.updateMeeting(meetingId, updatedMeeting);

        res.status(200).json({newMeetingCode: updatedMeeting.meetingCode}).end();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteMeeting = async (req: Request, res: Response) => {
    try {
        const meetingId = parseInt(req.params.id);
        await MeetingModel.deleteMeeting(meetingId);
        res.status(200).json({message: "Reunião deletada com sucesso"}).end();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export {
    createMeeting,
    getMeetingById,
    getMeetingWithUserAttendance,
    updateMeeting,
    updateMeetingCode,
    deleteMeeting
}