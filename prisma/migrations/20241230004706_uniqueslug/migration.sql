/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Task` ALTER COLUMN `slug` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Task_slug_key` ON `Task`(`slug`);
