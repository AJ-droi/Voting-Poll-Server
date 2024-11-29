import { Request, Response } from "express";
import AdminService from "../services/AdminService";

class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  public getAllAgents = async (req: Request, res: Response): Promise<void> => {
    try {
      const { page, limit, search, role, status } = req.query;
  
      const agents = await this.adminService.getAgents({
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
        search: search as string,
        filters: {
          ...(role && { role }),
          ...(status && { status }),
        },
      });
  
      res.status(200).json(agents);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
  

  public getElectionResults = async (req: Request, res: Response): Promise<void> => {
    try {
      const results = await this.adminService.getElectionResults();
      res.status(200).json(results);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  public deleteAgent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.adminService.deleteAgent(id);
      res.status(200).json({ message: "Agent deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  public getAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
      const analytics = await this.adminService.getAnalytics();
      res.status(200).json(analytics);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
  
  
}

export default AdminController;
