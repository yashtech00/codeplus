-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_discussId_fkey" FOREIGN KEY ("discussId") REFERENCES "Discuss"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
