import {Router} from "express";
import {deleteUser, getUserById, getUsers, updateUser} from "../../../controllers/general/user/userController";

export default (router: Router) => {
    router.get("/users", getUsers);
    router.get("/users/:userId", getUserById);
    router.put("/users/:userId", updateUser);
    router.delete("/users/:userId", deleteUser);
}