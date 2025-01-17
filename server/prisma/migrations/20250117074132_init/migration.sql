-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "productOwnerUserId" INTEGER,
ALTER COLUMN "projectManagerUserId" DROP NOT NULL;
