/*
  Warnings:

  - You are about to drop the column `attachements` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `costAmount` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `deadline` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `receipt` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `taskNumber` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `telephoneNumber` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `tenantEmail` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `tenantName` on the `Task` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Task_taskNumber_key` ON `Task`;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `attachements`,
    DROP COLUMN `category`,
    DROP COLUMN `company`,
    DROP COLUMN `costAmount`,
    DROP COLUMN `deadline`,
    DROP COLUMN `phoneNumber`,
    DROP COLUMN `receipt`,
    DROP COLUMN `status`,
    DROP COLUMN `taskNumber`,
    DROP COLUMN `telephoneNumber`,
    DROP COLUMN `tenantEmail`,
    DROP COLUMN `tenantName`;
