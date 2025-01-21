import { Router } from "express";
import { getTasks, createTask, updateTaskStatus } from "../controllers/taskController";

const router = Router();

// GET /tasks/:project_id
router.get("/:project_id", getTasks);

// POST /tasks/new
router.post("/new", createTask);

//PATCH /tasks/:task_id/status
router.patch("/:id/status", updateTaskStatus);

export default router;