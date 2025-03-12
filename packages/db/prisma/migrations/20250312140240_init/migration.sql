-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_discussId_fkey";

-- AlterTable
ALTER TABLE "Discuss" ADD COLUMN     "commentCount" INTEGER DEFAULT 0,
ALTER COLUMN "downVote" SET DEFAULT 0;
