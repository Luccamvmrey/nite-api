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
            include: {
                schedule: true,
            }
        });
    }

    static async getUsers() {
        return User.findMany();
    }

    static async updateUser(userId: number, fields: {}) {
        return User.update({
            where: {
                id: userId,
            },
            data: fields
        });
    }

    static async deleteUser(userId: number) {
        await User.delete({
            where: {
                id: userId,
            },
        });
    }
}