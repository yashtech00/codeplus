/*
  Warnings:

  - Added the required column `companyName` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "solved" INTEGER NOT NULL DEFAULT 0;
