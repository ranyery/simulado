/*
  Warnings:

  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "role";
ALTER TABLE "users" ADD COLUMN     "roles" "EUserRole"[] DEFAULT ARRAY['USER']::"EUserRole"[];
