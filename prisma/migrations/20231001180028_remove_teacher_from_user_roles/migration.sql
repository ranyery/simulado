/*
  Warnings:

  - The values [TEACHER] on the enum `EUserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "EUserRole"DROP VALUE 'TEACHER';
