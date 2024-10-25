import {Request, Response} from "express";
import {authentication} from "../../helper/helpers";
import UserService from "../../models/general/UserService";

const userService = new UserService();

const login = async (req: Request, res: Response) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            res.status(400).json({error: "Campos obrigatórios não preenchidos."});
        }

        const user = await userService.getUserByEmail(email);
        if (!user) {
            res.status(404).json({error: "Usuário não encontrado."});
        }

        const expectedHash = authentication(user.salt, password);
        if (expectedHash !== user.password) {
            res.status(400).json({error: "Credenciais inválidas."});
        }

        const updatedUser = await userService.createSessionToken(user.id, password);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const signup = async (req: Request, res: Response) => {
    try {
        const {
            username,
            email,
            password,
        } = req.body;

        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
            res.status(400).json({error: "Usuário já cadastrado."});
        }

        const newUser = await userService.createUser(username, email, password);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export {
    login,
    signup,
}