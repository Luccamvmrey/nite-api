import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const Hierarchy = prisma.hierarchy;

export default class HierarchyModel {
    static async createHierarchy(name: string, level: number) {
        return Hierarchy.create({
            data: {
                name,
                level,
            }
        });
    }

    static async getAllHierarchies() {
        return Hierarchy.findMany();
    }

    static async getHierarchyById(id: number) {
        return Hierarchy.findUnique({
            where: {
                id
            }
        });
    }

    static async updateHierarchy(id: number, fields: {}) {
        return Hierarchy.update({
            where: {
                id
            },
            data: fields
        });
    }

    static async deleteHierarchy(id: number) {
        return Hierarchy.delete({
            where: {
                id
            }
        });
    }
}