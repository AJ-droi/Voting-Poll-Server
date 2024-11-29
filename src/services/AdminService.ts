import { paginate, PaginatedResult, PaginationParams } from "../utils/Pagination";
import { PrismaClient, Agent } from "@prisma/client";

class AdminService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getAgents(
    query: PaginationParams & { search?: string; filters?: Record<string, any> }
  ): Promise<PaginatedResult<Agent>> {
    const { search, filters, ...paginationParams } = query;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    if (filters) {
      Object.assign(where, filters);
    }

    return paginate(this.prisma.agent, { ...paginationParams, where, include: { address: true, electionResults: true } });
  }

  public async getElectionResults(): Promise<any> {
    return this.prisma.electionResult.findMany({
      include: {
        agent: true,
        // candidate: true,
      },
    });
  }

  public async deleteAgent(agentId: string): Promise<any> {
    return this.prisma.agent.delete({
      where: { id: agentId },
    });
  }

  public async getAnalytics(): Promise<any> {
    const totalAgents = await this.prisma.agent.count();
    const totalElections = await this.prisma.electionResult.count();
    const totalPayments = await this.prisma.payment.aggregate({
      _sum: { amount: true },
    }); 
  
    return {
      totalAgents,
      totalElections,
      totalPayments: totalPayments._sum.amount || 0,
    };
  }
  
  

  
}

export default AdminService