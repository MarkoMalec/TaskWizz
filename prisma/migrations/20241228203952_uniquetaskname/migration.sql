/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Task` ALTER COLUMN `name` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Task_name_key` ON `Task`(`name`);
