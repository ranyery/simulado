/*
  Warnings:

  - You are about to drop the `exams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "exams";

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
