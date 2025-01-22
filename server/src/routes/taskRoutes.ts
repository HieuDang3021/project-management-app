import { Router } from "express";
const controller = require("../controllers/taskController");

const router = Router();

// GET /tasks/:project_id
router.get("/:project_id", controller.getTasks);

// POST /tasks/new
router.post("/new", controller.createTask);

//PATCH /tasks/:task_id/status
router.patch("/:id/status", controller.updateTaskStatus);

export default router;