/*
  Warnings:

  - You are about to drop the `QuestionToTopic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionToTopic" DROP CONSTRAINT "QuestionToTopic_questionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionToTopic" DROP CONSTRAINT "QuestionToTopic_topicId_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_instituteId_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "topics" DROP CONSTRAINT "topics_subjectId_fkey";

-- DropTable
DROP TABLE "QuestionToTopic";
