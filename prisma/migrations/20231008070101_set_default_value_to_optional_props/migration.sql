/*
  Warnings:

  - Made the column `explanation` on table `questions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `subjects` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `topics` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "questions" ALTER COLUMN "explanation" SET NOT NULL;
ALTER TABLE "questions" ALTER COLUMN "explanation" SET DEFAULT '';

-- AlterTable
ALTER TABLE "subjects" ALTER COLUMN "description" SET NOT NULL;
ALTER TABLE "subjects" ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "topics" ALTER COLUMN "description" SET NOT NULL;
ALTER TABLE "topics" ALTER COLUMN "description" SET DEFAULT '';
