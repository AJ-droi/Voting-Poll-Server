import { Router } from "express";
import AdminController from "../controllers/AdminController";

const router = Router();
const adminController = new AdminController();

// Route for getting all agents
router.get("/agents", adminController.getAllAgents);
router.get("/election-results", adminController.getElectionResults);
router.delete("/agents/:id", adminController.deleteAgent);
// router.post("/agents/pay", adminController.payAllAgents);
router.get("/analytics", adminController.getAnalytics);

export default router;
