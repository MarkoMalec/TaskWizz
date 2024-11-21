/*
  Warnings:

  - Added the required column `contractFileUrl` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Task` ADD COLUMN `contractFileUrl` VARCHAR(191) NOT NULL;
