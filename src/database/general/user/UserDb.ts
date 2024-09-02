import {sequelize} from "../../../config/dbConnection";

const User = sequelize.models.User;

export default class UserDb {
    static async createUser(username: string, email: string, password: string, salt: string): Promise<any> {
        return await User.create({
            username: username,
            email: email,
            hashedPassword: password,
            salt: salt,
            hierarchyId: 1,
        });
    }

    static async getUserById(userId: number): Promise<any | null> {
        return await User.findByPk(userId);
    }

    static async getUserByEmail(email: string): Promise<any | null | undefined> {
        return await User.findOne({
            where: {
                email: email,
            },
        })
    }

    static async getUserByUsername(username: string): Promise<any | null> {
        return await User.findOne({
            where: {
                username: username,
            },
        });
    }

    static async getUsers(): Promise<any[]> {
        return await User.findAll();
    }

    static async getUsersByHierarchyId(hierarchyId: number): Promise<any[]> {
        return await User.findAll({
            where: {
                hierarchyId: hierarchyId,
            },
        });
    }

    static async updateUser(userId: number, fields: {}): Promise<any> {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        await user.update(fields);
        return user;
    }

    static async deleteUser(userId: number): Promise<void> {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        await user.destroy();
    }
}