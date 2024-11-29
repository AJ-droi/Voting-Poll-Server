import { Request, Response } from "express";
import ElectionResultService from "../services/ElectionResultService";
import { IGetUserAuthInfoRequest } from "../types/interface";


class ElectionResultController {
  private electionResultService: ElectionResultService;

  constructor() {
    this.electionResultService = new ElectionResultService();
  }

  public uploadElectionResult = async (req: Request, res: Response): Promise<any> => {
    try {
      const agentId = req.userId as unknown as string;  // assuming userId is attached via middleware
      console.log({agentId})
      const file = req.file;  // assuming you use multer for file uploads


    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const result = await this.electionResultService.uploadResult(agentId, file);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default ElectionResultController;
