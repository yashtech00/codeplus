/*
  Warnings:

  - The `companyName` column on the `Problem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "companyName",
ADD COLUMN     "companyName" TEXT[];
