/*
  Warnings:

  - The values [NOT_KNOWN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('POLLING_UNIT', 'LOCAL', 'STATE', 'ADMIN', 'UNKNOWN');
ALTER TABLE "Agent" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Agent" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "Agent" ALTER COLUMN "role" SET DEFAULT 'UNKNOWN';
COMMIT;

-- AlterTable
ALTER TABLE "Agent" ALTER COLUMN "role" SET DEFAULT 'UNKNOWN';
