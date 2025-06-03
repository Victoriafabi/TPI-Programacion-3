import { Router } from "express";
import {
  getAllBranches,
  getBranchById
} from "../services/branches.services.js";

const router = Router();
router.get("/", getAllBranches);
router.get("/:id", getBranchById);

export default router;
