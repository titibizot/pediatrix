/*
  Warnings:

  - You are about to drop the column `referenceLink` on the `Disease` table. All the data in the column will be lost.
  - The `embedding` column on the `Disease` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `link` to the `Disease` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Disease" DROP COLUMN "referenceLink",
ADD COLUMN     "link" TEXT NOT NULL,
DROP COLUMN "embedding",
ADD COLUMN     "embedding" JSONB;
