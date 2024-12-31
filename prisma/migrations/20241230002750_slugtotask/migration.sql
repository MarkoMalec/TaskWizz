/*
  Warnings:

  - A unique constraint covering the columns `[name,slug]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Task_name_key` ON `Task`;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `slug` VARCHAR(191) NOT NULL DEFAULT 'slug';

-- CreateIndex
CREATE UNIQUE INDEX `Task_name_slug_key` ON `Task`(`name`, `slug`);
