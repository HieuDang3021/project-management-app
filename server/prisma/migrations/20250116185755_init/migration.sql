/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `projectName` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `projectManagerUserID` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `cognitoID` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cognitoId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileURL` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectManagerUserId` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cognitoId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_cognitoID_key";

-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "fileUrl",
ADD COLUMN     "fileURL" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "content",
ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "projectName",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "projectManagerUserID",
ADD COLUMN     "projectManagerUserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cognitoID",
ADD COLUMN     "cognitoId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_cognitoId_key" ON "User"("cognitoId");
