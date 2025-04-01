/*
  Warnings:

  - You are about to drop the column `startingKeyword` on the `Disease` table. All the data in the column will be lost.
  - Made the column `trainingYear` on table `GameSession` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Disease" DROP COLUMN "startingKeyword";

-- AlterTable
ALTER TABLE "GameSession" ALTER COLUMN "trainingYear" SET NOT NULL;
