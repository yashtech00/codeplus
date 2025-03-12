/*
  Warnings:

  - Added the required column `updatedAt` to the `Discuss` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discuss" ADD COLUMN     "comment" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "downVote" INTEGER,
ADD COLUMN     "upVote" INTEGER DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
