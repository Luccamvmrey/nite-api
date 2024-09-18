import {Router} from "express";
import {
    deleteUser,
    getUserById,
    getUserBySessionToken,
    getUsers,
    updateUser
} from "../../controllers/general/userController";

export default (router: Router) => {
    router.get("/users", getUsers);
    router.get("/users/:userId", getUserById);
    router.get("/users/session/:sessionToken", getUserBySessionToken);
    router.put("/users/:userId", updateUser);
    router.delete("/users/:userId", deleteUser);
}