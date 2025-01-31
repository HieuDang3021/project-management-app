import { Router } from "express";
const controller = require("../controllers/usercontroller");

const router = Router();

// GET /users/
router.get("/", controller.getUsers);

export default router;