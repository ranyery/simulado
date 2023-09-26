-- CreateEnum
CREATE TYPE "EUserRole" AS ENUM ('USER', 'TEACHER', 'ADMIN');

-- CreateEnum
CREATE TYPE "EUserStatus" AS ENUM ('ACTIVE', 'PENDING_CONFIRMATION', 'SUSPENDED', 'BANNED', 'CLOSED');

-- CreateEnum
CREATE TYPE "EQuestionType" AS ENUM ('MULTIPLE_CHOICE', 'TRUE_OR_FALSE', 'FILL_IN_THE_BLANK');

-- CreateEnum
CREATE TYPE "EQuestionDifficultyLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "EQuestionStatus" AS ENUM ('ACTIVE', 'PENDING_REVIEW', 'ARCHIVED');

-- CreateTable
CREATE TABLE "users" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "role" "EUserRole" NOT NULL DEFAULT 'USER',
    "status" "EUserStatus" NOT NULL DEFAULT 'PENDING_CONFIRMATION',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topics" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING,
    "subjectId" STRING NOT NULL,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" STRING NOT NULL,
    "statement" STRING NOT NULL,
    "answerOptions" STRING NOT NULL DEFAULT '[]',
    "explanation" STRING,
    "type" "EQuestionType" NOT NULL DEFAULT 'MULTIPLE_CHOICE',
    "source" STRING NOT NULL,
    "difficultyLevel" "EQuestionDifficultyLevel" NOT NULL DEFAULT 'MEDIUM',
    "subjectId" STRING NOT NULL,
    "relatedTopicIds" STRING[] DEFAULT ARRAY[]::STRING[],
    "status" "EQuestionStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
