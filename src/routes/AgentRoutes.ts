import { Router } from "express";
import AgentController from "../controllers/AgentController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { validateRequest } from "../validators";
import { updateProfileSchema, verifyRoleSchema } from "../validators/schema/AgentSchema";

const router = Router();
const agentController = new AgentController();

// Route for updating profile
router.put(
  "/update-profile",
  AuthMiddleware.authenticateUser,
  validateRequest(updateProfileSchema),
  agentController.updateProfile
);

// Route for verifying role
router.put(
  "/role",
  AuthMiddleware.authenticateUser,
  validateRequest(verifyRoleSchema),
  agentController.verifyRole
);

// Route for getting profile
router.get("/profile", AuthMiddleware.authenticateUser, agentController.getProfile);

export default router;
