/*
  Warnings:

  - You are about to drop the column `source` on the `questions` table. All the data in the column will be lost.
  - Added the required column `examId` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questions" DROP COLUMN "source";
ALTER TABLE "questions" ADD COLUMN     "examId" STRING NOT NULL;
ALTER TABLE "questions" ADD COLUMN     "year" INT4 NOT NULL DEFAULT 0;
