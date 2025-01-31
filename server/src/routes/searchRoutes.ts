import { Router } from "express";
const controller = require("../controllers/searchController")

const router = Router();

// GET /search/
router.get("/", controller.search);

export default router;