/*
  Warnings:

  - You are about to drop the column `specialty` on the `Disease` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Disease" DROP COLUMN "specialty",
ALTER COLUMN "link" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Specialty" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Specialty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DiseaseSpecialties" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DiseaseSpecialties_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_name_key" ON "Specialty"("name");

-- CreateIndex
CREATE INDEX "_DiseaseSpecialties_B_index" ON "_DiseaseSpecialties"("B");

-- AddForeignKey
ALTER TABLE "_DiseaseSpecialties" ADD CONSTRAINT "_DiseaseSpecialties_A_fkey" FOREIGN KEY ("A") REFERENCES "Disease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiseaseSpecialties" ADD CONSTRAINT "_DiseaseSpecialties_B_fkey" FOREIGN KEY ("B") REFERENCES "Specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
