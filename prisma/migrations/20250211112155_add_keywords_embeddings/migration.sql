/*
  Warnings:

  - You are about to drop the column `embedding` on the `Disease` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Disease" DROP COLUMN "embedding",
ADD COLUMN     "keywordsembedding" JSONB;
