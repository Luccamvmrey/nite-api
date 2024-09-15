import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const User = prisma.user;

export default class UserModel {
    static async createUser(username: string, email: string, password: string, salt: string): Promise<any> {
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

    static async getUserById(userId: number): Promise<any | null> {
        return User.findUnique({
            where: {
                id: userId,
            },
            include: {
                schedule: true,
            }
        });
    }

    static async getUserByEmail(email: string): Promise<any | null | undefined> {
        return User.findFirst({
            where: {
                email: email,
            },
        });
    }

    static async getUsers(): Promise<any[]> {
        return User.findMany();
    }

    static async updateUser(userId: number, fields: {}): Promise<any> {
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

    static async deleteUser(userId: number): Promise<any> {
        await User.delete({
            where: {
                id: userId,
            },
        });
    }
}