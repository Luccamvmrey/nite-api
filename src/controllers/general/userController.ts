import {Request, Response} from "express";
import UserModel from "../../models-prisma/general/UserModel";

const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        if (!userId) {
            return res.status(400).json({
                error: "ID inválido."
            });
        }

        const user = await UserModel.getUserById(userId);
        if (!user) {
            return res.status(404).json({
                error: "Usuário não encontrado."
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const getUsers = async (_: Request, res: Response) => {
    try {
        const users = await UserModel.getUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        if (!userId) {
            return res.status(400).json({
                error: "ID inválido."
            });
        }

        const fields = req.body;
        const updatedUser = await UserModel.updateUser(userId, fields);
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        if (!userId) {
            return res.status(400).json({
                error: "ID inválido."
            });
        }

        await UserModel.deleteUser(userId);
        return res.status(200);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export {
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
}