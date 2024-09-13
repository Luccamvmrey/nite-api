import {Request, Response} from 'express';
import HierarchyModel from "../../models-prisma/general/HierarchyModel";

const createHierarchy = async (req: Request, res: Response) => {
    try {
        const {name, level} = req.body;
        if (!name || !level) {
            return res.status(400).json({error: "Campos obrigatórios não preenchidos."});
        }

        const hierarchy = await HierarchyModel.createHierarchy(name, level);
        return res.status(201).json(hierarchy);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const getAllHierarchies = async (req: Request, res: Response) => {
    try {
        const hierarchies = await HierarchyModel.getAllHierarchies();
        return res.status(200).json(hierarchies);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const getHierarchyById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.hierarchyId);
        if (!id) {
            return res.status(400).json({error: "ID inválido."});
        }

        const hierarchy = await HierarchyModel.getHierarchyById(id);
        return res.status(200).json(hierarchy);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const updateHierarchy = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.hierarchyId);
        const fields = req.body;
        if (!id || !fields) {
            return res.status(400).json({error: "Campos obrigatórios não preenchidos."});
        }

        const hierarchy = await HierarchyModel.updateHierarchy(id, fields);
        return res.status(200).json(hierarchy);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const deleteHierarchy = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.hierarchyId);
        if (!id) {
            return res.status(400).json({error: "ID inválido."});
        }

        await HierarchyModel.deleteHierarchy(id);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export {
    createHierarchy,
    getAllHierarchies,
    getHierarchyById,
    updateHierarchy,
    deleteHierarchy
}