/*
  Warnings:

  - The `type` column on the `questions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `difficultyLevel` column on the `questions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `questions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EQuestionType" AS ENUM ('MULTIPLE_CHOICE', 'TRUE_OR_FALSE', 'FILL_IN_THE_BLANK');

-- CreateEnum
CREATE TYPE "EQuestionDifficultyLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "EQuestionStatus" AS ENUM ('ACTIVE', 'PENDING_REVIEW', 'ARCHIVED');

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "type",
ADD COLUMN     "type" "EQuestionType" NOT NULL DEFAULT 'MULTIPLE_CHOICE',
DROP COLUMN "difficultyLevel",
ADD COLUMN     "difficultyLevel" "EQuestionDifficultyLevel" NOT NULL DEFAULT 'MEDIUM',
DROP COLUMN "status",
ADD COLUMN     "status" "EQuestionStatus" NOT NULL DEFAULT 'PENDING_REVIEW';

-- CreateTable
CREATE TABLE "Answer" (
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL
);
