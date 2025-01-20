import { Router } from "express";
import { getProjects, createProject } from "../controllers/projectController";

const router = Router();

// GET /projects
router.get("/", getProjects);

// POST /projects/new
router.post("/new", createProject);

export default router;