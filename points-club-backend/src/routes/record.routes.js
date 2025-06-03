import { Router } from "express";
import { getRecords, createRecord } from "../services/record.services.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", (req, res) => {
    res.status(404).send("La ruta /api/records/ no lista todos los canjes sin un ID de usuario. Usa /api/records/user/:userId");
});

router.post("/", verifyToken, createRecord);

router.get("/user/:userId", verifyToken, getRecords);

export default router;
