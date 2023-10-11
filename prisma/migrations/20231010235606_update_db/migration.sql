-- CreateEnum
CREATE TYPE "EUserRole" AS ENUM ('USER', 'MODERATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "EUserStatus" AS ENUM ('ACTIVE', 'PENDING_CONFIRMATION', 'SUSPENDED', 'BANNED', 'CLOSED');

-- CreateEnum
CREATE TYPE "ECommonStatus" AS ENUM ('ACTIVE', 'PENDING_REVIEW', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "EQuestionDifficultyLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "EQuestionType" AS ENUM ('MULTIPLE_CHOICE', 'TRUE_OR_FALSE', 'FILL_IN_THE_BLANK');

-- CreateTable
CREATE TABLE "users" (
    "id" STRING NOT NULL,
    "user_email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "roles" "EUserRole"[] DEFAULT ARRAY['USER']::"EUserRole"[],
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
    "status" "ECommonStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topics" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING NOT NULL DEFAULT '',
    "status" "ECommonStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subjectId" STRING NOT NULL,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institutes" (
    "id" STRING NOT NULL,
    "acronym" STRING NOT NULL,
    "name" STRING NOT NULL DEFAULT '',
    "status" "ECommonStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "institutes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" STRING NOT NULL,
    "statement" STRING NOT NULL,
    "answerOptions" STRING[],
    "rightAnswer" INT4 NOT NULL,
    "explanation" STRING NOT NULL DEFAULT '',
    "difficultyLevel" "EQuestionDifficultyLevel" NOT NULL DEFAULT 'MEDIUM',
    "type" "EQuestionType" NOT NULL DEFAULT 'MULTIPLE_CHOICE',
    "status" "ECommonStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "year" INT4 NOT NULL DEFAULT 0,
    "instituteId" STRING NOT NULL,
    "subjectId" STRING NOT NULL,
    "topicIds" STRING[] DEFAULT ARRAY[]::STRING[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionToTopic" (
    "id" STRING NOT NULL,
    "questionId" STRING NOT NULL,
    "topicId" STRING NOT NULL,

    CONSTRAINT "QuestionToTopic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "topics_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "institutes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionToTopic" ADD CONSTRAINT "QuestionToTopic_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionToTopic" ADD CONSTRAINT "QuestionToTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
