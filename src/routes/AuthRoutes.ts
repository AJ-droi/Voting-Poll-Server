import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { validateRequest } from "../validators";
import { loginSchema, registerSchema } from "../validators/schema/AuthSchema";

const router = Router();
const authController = new AuthController();

router.post("/register", validateRequest(registerSchema), authController.register);
router.post("/login", validateRequest(loginSchema), authController.login);
router.get('/verify-email/:token', authController.verifyEmail)
export default router;
