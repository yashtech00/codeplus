-- CreateTable
CREATE TABLE "Discuss" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Discuss_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Discuss" ADD CONSTRAINT "Discuss_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
