import { Router } from "express";
import ElectionResultController from "../controllers/ElectionResultController";
import { uploadElectionResult } from "../middlewares/FileUploadMiddleware";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = Router();
const electionResultController = new ElectionResultController();

// Route to upload election result
router.post("/upload",  uploadElectionResult, AuthMiddleware.authenticateUser, electionResultController.uploadElectionResult);

export default router;
