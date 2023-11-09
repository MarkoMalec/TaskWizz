/*
  Warnings:

  - You are about to drop the column `contactPerson` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Task` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taskNumber]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attachements` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costAmount` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receipt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskNumber` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephoneNumber` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantEmail` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantName` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Task` DROP COLUMN `contactPerson`,
    DROP COLUMN `name`,
    ADD COLUMN `attachements` VARCHAR(191) NOT NULL,
    ADD COLUMN `category` VARCHAR(191) NOT NULL DEFAULT 'Other',
    ADD COLUMN `costAmount` VARCHAR(191) NOT NULL,
    ADD COLUMN `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `priority` VARCHAR(191) NOT NULL DEFAULT 'Normal',
    ADD COLUMN `receipt` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `taskNumber` INTEGER NOT NULL,
    ADD COLUMN `telephoneNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `tenantEmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `tenantName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Task_taskNumber_key` ON `Task`(`taskNumber`);
