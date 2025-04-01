-- CreateEnum
CREATE TYPE "TrainingYear" AS ENUM ('DCEM', 'DFASM1', 'DFASM2', 'DFASM3', 'INTERNES', 'DOCTEUR', 'AUTRE');

-- AlterTable
ALTER TABLE "Disease" ADD COLUMN     "startingKeyword" TEXT;

-- AlterTable
ALTER TABLE "GameSession" ADD COLUMN     "trainingYear" "TrainingYear";

-- CreateTable
CREATE TABLE "KeywordSubmission" (
    "id" TEXT NOT NULL,
    "gameSessionId" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KeywordSubmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KeywordSubmission" ADD CONSTRAINT "KeywordSubmission_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
