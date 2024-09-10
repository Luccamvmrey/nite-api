import {Router} from "express";
import {
    createHierarchy, deleteHierarchy,
    getAllHierarchies,
    getHierarchyById, updateHierarchy
} from "../../../controllers/general/hierarchy/hierarchyController";

export default (router: Router) => {
    router.post("/hierarchy", createHierarchy);
    router.get("/hierarchy", getAllHierarchies);
    router.get("/hierarchy/:hierarchyId", getHierarchyById);
    router.put("/hierarchy/:hierarchyId", updateHierarchy);
    router.delete("/hierarchy/:hierarchyId", deleteHierarchy);
}