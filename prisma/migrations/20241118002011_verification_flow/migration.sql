-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "passwordResetExpires" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT,
ADD COLUMN     "verificationToken" TEXT;
