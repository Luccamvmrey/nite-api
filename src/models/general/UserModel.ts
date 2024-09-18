import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const User = prisma.user;

export default class UserModel {
    static async createUser(username: string, email: string, password: string, salt: string) {
        return User.create({
            data: {
                username: username,
                email: email,
                hashedPassword: password,
                salt: salt,
                sessionToken: null,
                hierarchy: {
                    connect: {
                        id: 1,
                    },
                },
            }
        });
    }

    static async getUserById(userId: number) {
        return User.findUnique({
            where: {
                id: userId,
            },
            include: {
                schedule: true,
            }
        });
    }

    static async getUserByEmail(email: string) {
        return User.findFirst({
            where: {
                email: email,
            },
        });
    }

    static async getUserBySessionToken(sessionToken: string) {
        return User.findFirst({
            where: {
                sessionToken: sessionToken,
            },
        });
    }

    static async getUsers() {
        return User.findMany();
    }

    static async updateUser(userId: number, fields: {}) {
        const user = await User.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        await User.update({
            where: {
                id: userId,
            },
            data: {...fields},
        });
        return user;
    }

    static async deleteUser(userId: number) {
        await User.delete({
            where: {
                id: userId,
            },
        });
    }
}