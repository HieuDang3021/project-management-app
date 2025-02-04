import { Router } from "express";
const controller = require("../controllers/teamController");

const router = Router();

// GET /teams/
router.get("/", controller.getTeamsWithUserName);

export default router;