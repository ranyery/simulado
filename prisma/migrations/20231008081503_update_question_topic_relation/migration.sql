-- CreateEnum
CREATE TYPE "EUserRole" AS ENUM ('USER', 'MODERATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "EUserStatus" AS ENUM ('ACTIVE', 'PENDING_CONFIRMATION', 'SUSPENDED', 'BANNED', 'CLOSED');

-- CreateEnum
CREATE TYPE "ESubjectStatus" AS ENUM ('ACTIVE', 'PENDING_REVIEW', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ETopicStatus" AS ENUM ('ACTIVE', 'PENDING_REVIEW', 'ARCHIVED');

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
    "roles" "EUserRole"[] DEFAULT ARRAY['USER']::"EUserRole"[],
    "permissions" STRING NOT NULL DEFAULT '[]',
    "status" "EUserStatus" NOT NULL DEFAULT 'PENDING_CONFIRMATION',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING NOT NULL DEFAULT '',
    "status" "ESubjectStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topics" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING NOT NULL DEFAULT '',
    "status" "ETopicStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subjectId" STRING NOT NULL,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" STRING NOT NULL,
    "statement" STRING NOT NULL,
    "answerOptions" STRING NOT NULL DEFAULT '[]',
    "explanation" STRING NOT NULL DEFAULT '',
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

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "topics_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
