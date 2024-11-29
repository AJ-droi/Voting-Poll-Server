import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";

class ElectionResultService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async uploadResult(agentId: string, file: Express.Multer.File ): Promise<any> {
    if (!file) throw new Error("No file uploaded");

    // const imagePath = `/uploads/election_results/${file.filename}`;
    const cloudinaryUrl = (file as any).path;
    const electionResult = await this.prisma.electionResult.create({
      data: {
        agentId,
        resultImage: cloudinaryUrl,
      },
    });

    // Optionally, move the file to the desired storage (e.g., cloud storage or local directory)
    return electionResult;
  }
}

export default ElectionResultService;
