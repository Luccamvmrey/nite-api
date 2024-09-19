import {Request, Response} from "express";
import {authentication, random} from "../../helper/helpers";
import UserModel from "../../models/general/UserModel";

const login = async (req: Request, res: Response) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Campos obrigatórios não preenchidos."
            });
        }

        const user = await UserModel.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({
                error: "Usuário não encontrado."
            });
        }

        const expectedHash = authentication(user.salt, password);
        if (expectedHash !== user.hashedPassword) {
            return res.status(400).json({
                error: "Credenciais inválidas."
            });
        }

        const salt = random();
        const updatedFields = {
            sessionToken: authentication(salt, user.email),
        }
        const updatedUser = await UserModel.updateUser(user.id, updatedFields);
        console.log(updatedUser.sessionToken);
        console.log(updatedFields.sessionToken);

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

const signup = async (req: Request, res: Response) => {
    try {
        const {
            username,
            email,
            password,
        } = req.body;

        const existingUser = await UserModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                error: "Usuário já cadastrado."
            });
        }

        const salt = random();
        const hashedPassword = authentication(salt, password);
        const newUser = await UserModel.createUser(
            username,
            email,
            hashedPassword,
            salt,
        );

        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

export {
    login,
    signup,
}