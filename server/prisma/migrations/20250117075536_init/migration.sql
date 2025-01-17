/*
  Warnings:

  - You are about to drop the column `profilePictureURL` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilePictureURL",
ADD COLUMN     "profilePictureUrl" TEXT;
