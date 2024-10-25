import {Request, Response} from "express";
import UserService from "../../models/general/UserService";

const userService = new UserService();

const getUserById = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        if (!userId) {
            res.status(400).json({error: "ID inválido."});
        }

        const user = await userService.getById(userId);
        if (!user) {
            res.status(404).json({error: "Usuário não encontrado."});
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getUserBySessionToken = async (req: Request, res: Response) => {
    try {
        const {sessionToken} = req.params;
        if (!sessionToken) {
            res.status(400).json({error: "Token inválido."});
        }

        const user = await userService.getUserBySessionToken(sessionToken);
        if (!user) {
            res.status(404).json({error: "Usuário não encontrado."});
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getUsers = async (_: Request, res: Response) => {
    try {
        const users = await userService.getAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        if (!userId) {
            res.status(400).json({error: "ID inválido."});
        }

        const data = req.body;
        const updatedUser = await userService.update(userId, data);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        if (!userId) {
            res.status(400).json({error: "ID inválido."});
        }

        await userService.delete(userId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export {
    getUserById,
    getUserBySessionToken,
    getUsers,
    updateUser,
    deleteUser,
}