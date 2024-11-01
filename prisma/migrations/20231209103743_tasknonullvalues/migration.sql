/*
  Warnings:

  - Made the column `address` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateCreated` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `priority` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deadline` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postcode` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `address` VARCHAR(191) NOT NULL,
    MODIFY `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `description` TEXT NOT NULL,
    MODIFY `priority` VARCHAR(191) NOT NULL DEFAULT 'Normal',
    MODIFY `name` VARCHAR(191) NOT NULL DEFAULT 'Task name',
    MODIFY `city` VARCHAR(191) NOT NULL,
    MODIFY `deadline` DATETIME(3) NOT NULL,
    MODIFY `postcode` VARCHAR(191) NOT NULL;
