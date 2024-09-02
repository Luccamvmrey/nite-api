import {Request, Response} from "express";
import UserDb from "../../../database/general/user/UserDb";
import {authentication, random} from "../../../helper/authHelpers";

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

        const user = await UserDb.getUserByEmail(email);
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
        const updatedUser = await UserDb.updateUser(user.userId, updatedFields);

        
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}