/*
  Warnings:

  - You are about to drop the column `taskID` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `uploadByUserID` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `taskID` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `projectID` on the `ProjectTeam` table. All the data in the column will be lost.
  - You are about to drop the column `teamID` on the `ProjectTeam` table. All the data in the column will be lost.
  - You are about to drop the column `assigneeUserID` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `authorUserID` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `projectID` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `taskID` on the `TaskAssignment` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `TaskAssignment` table. All the data in the column will be lost.
  - You are about to drop the column `teamID` on the `User` table. All the data in the column will be lost.
  - Added the required column `taskId` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadByUserId` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `ProjectTeam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `ProjectTeam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorUserId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId` to the `TaskAssignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TaskAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_taskID_fkey";

-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_uploadByUserID_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_taskID_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userID_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTeam" DROP CONSTRAINT "ProjectTeam_projectID_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTeam" DROP CONSTRAINT "ProjectTeam_teamID_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assigneeUserID_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_authorUserID_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectID_fkey";

-- DropForeignKey
ALTER TABLE "TaskAssignment" DROP CONSTRAINT "TaskAssignment_taskID_fkey";

-- DropForeignKey
ALTER TABLE "TaskAssignment" DROP CONSTRAINT "TaskAssignment_userID_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamID_fkey";

-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "taskID",
DROP COLUMN "uploadByUserID",
ADD COLUMN     "taskId" INTEGER NOT NULL,
ADD COLUMN     "uploadByUserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "taskID",
DROP COLUMN "userID",
ADD COLUMN     "taskId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProjectTeam" DROP COLUMN "projectID",
DROP COLUMN "teamID",
ADD COLUMN     "projectId" INTEGER NOT NULL,
ADD COLUMN     "teamId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "assigneeUserID",
DROP COLUMN "authorUserID",
DROP COLUMN "projectID",
ADD COLUMN     "assigneeUserId" INTEGER,
ADD COLUMN     "authorUserId" INTEGER NOT NULL,
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TaskAssignment" DROP COLUMN "taskID",
DROP COLUMN "userID",
ADD COLUMN     "taskId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "teamID",
ADD COLUMN     "teamId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTeam" ADD CONSTRAINT "ProjectTeam_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTeam" ADD CONSTRAINT "ProjectTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_authorUserId_fkey" FOREIGN KEY ("authorUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigneeUserId_fkey" FOREIGN KEY ("assigneeUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAssignment" ADD CONSTRAINT "TaskAssignment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAssignment" ADD CONSTRAINT "TaskAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_uploadByUserId_fkey" FOREIGN KEY ("uploadByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
