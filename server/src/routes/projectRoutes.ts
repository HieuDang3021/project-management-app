import { Router } from "express";
const controller = require("../controllers/projectController");
const router = Router();

// GET /projects
router.get("/", controller.getProjects);

// POST /projects/new
router.post("/new", controller.createProject);

export default router;