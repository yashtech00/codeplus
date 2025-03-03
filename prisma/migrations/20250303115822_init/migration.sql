/*
  Warnings:

  - Changed the type of `likeCount` on the `Problem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dislikeCount` on the `Problem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "likeCount",
ADD COLUMN     "likeCount" INTEGER NOT NULL,
DROP COLUMN "dislikeCount",
ADD COLUMN     "dislikeCount" INTEGER NOT NULL;
