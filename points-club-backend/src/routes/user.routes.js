import { Router } from 'express';
import {
    getUsers,
    getUserById,
    registerUser,
    loginUser,
    updateUser,
    deleteUser
} from "../services/user.services.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUserById);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);


export default router;
