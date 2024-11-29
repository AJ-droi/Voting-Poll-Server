import { Request, Response } from "express";
import AgentService  from "../services/AgentService";

class AgentController {
  private agentService: AgentService;

  constructor() {
    this.agentService = new AgentService();
  }

  public updateProfile = async(req: Request, res: Response): Promise<any> =>{
    try {
      const agentId = req.userId as string;
      const { name, address } = req.body;

      const updatedAgent = await this.agentService.updateProfile(agentId, { name, address });
      return res.status(200).json({
        message: "Profile updated successfully",
        agent: updatedAgent,
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public verifyRole = async (req: Request, res: Response): Promise<any> => {
    try {
      const agentId = req.userId as string;
      const { bvn, role, nin} = req.body;

      const updatedAgent = await this.agentService.verifyRole(agentId, { bvn, role, nin });
      return res.status(200).json({
        message: "Role updated successfully",
        agent: updatedAgent,
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public getProfile = async(req: Request, res: Response): Promise<any> =>{
    try {
      const agentId = req.userId as string;
      const agent = await this.agentService.getProfile(agentId);
      console.log({agent})
      return res.status(200).json({
        message: "Profile fetched successfully",
        agent,
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

}

export default AgentController;
