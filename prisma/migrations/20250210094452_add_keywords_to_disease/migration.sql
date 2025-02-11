/*
  Warnings:

  - You are about to drop the column `description` on the `Disease` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Disease" DROP COLUMN "description",
ADD COLUMN     "referenceLink" TEXT;
