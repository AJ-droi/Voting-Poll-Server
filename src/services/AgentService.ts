import { PrismaClient, Role } from "@prisma/client";

interface UpdateProfileData {
  name?: string;
  address?: {
    state: string;
    city: string;
    localGovernment: string;
  };
}

interface VerifyRoleData {
  bvn: string;
  role: Role;
  nin: string
}

class AgentService {

    private prisma: PrismaClient;

    constructor() {
      this.prisma = new PrismaClient();
    }
  
  // 1. Update Profile
  public async updateProfile(agentId: string, data: UpdateProfileData) {
    const { name, address } = data;

    return this.prisma.agent.update({
      where: { id: agentId },
      data: {
        name,
        address: address
          ? {
              upsert: {
                create: {
                  state: address.state,
                  city: address.city,
                  localGovernment: address.localGovernment,
                },
                update: {
                  state: address.state,
                  city: address.city,
                  localGovernment: address.localGovernment,
                },
              },
            }
          : undefined,
      },
      include: { address: true },
    });
  }

  // 2. Verify Role with BVN
  public async verifyRole(agentId: string, data: VerifyRoleData) {
    const { bvn, role, nin} = data;

    return this.prisma.agent.update({
      where: { id: agentId },
      data: {
        bvn,
        role,
        nin
      },
    });
  }

  // 3. Get Profile
  public async getProfile(agentId: string) {
    console.log('hello')
    const agent = await this.prisma.agent.findUnique({
      where: { id: agentId },
      include: { address: true, electionResults: true },
    });

    if (!agent) throw new Error("Agent not found");

    return agent;
  }
}

export default AgentService
