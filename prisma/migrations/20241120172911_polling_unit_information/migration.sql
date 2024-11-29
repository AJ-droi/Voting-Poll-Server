/*
  Warnings:

  - A unique constraint covering the columns `[pollingUnitId]` on the table `Agent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "pollingUnitId" TEXT;

-- AlterTable
ALTER TABLE "ElectionResult" ADD COLUMN     "pollingUnitId" TEXT;

-- CreateTable
CREATE TABLE "PollingUnitInformation" (
    "id" TEXT NOT NULL,
    "ward" TEXT NOT NULL,
    "localGovernment" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PollingUnitInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agent_pollingUnitId_key" ON "Agent"("pollingUnitId");

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_pollingUnitId_fkey" FOREIGN KEY ("pollingUnitId") REFERENCES "PollingUnitInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectionResult" ADD CONSTRAINT "ElectionResult_pollingUnitId_fkey" FOREIGN KEY ("pollingUnitId") REFERENCES "PollingUnitInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
