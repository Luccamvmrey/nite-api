import {Router} from "express";
import {
    createHierarchy, deleteHierarchy,
    getAllHierarchies,
    getHierarchyById, updateHierarchy
} from "../../controllers/general/hierarchy/hierarchyController";

export default (router: Router) => {
    router.post("/hierarchies", createHierarchy);
    router.get("/hierarchies", getAllHierarchies);
    router.get("/hierarchies/:hierarchyId", getHierarchyById);
    router.put("/hierarchies/:hierarchyId", updateHierarchy);
    router.delete("/hierarchies/:hierarchyId", deleteHierarchy);
}