-- AlterTable
ALTER TABLE `Task` MODIFY `deadline` DATETIME(3) NULL,
    MODIFY `address` VARCHAR(191) NULL,
    MODIFY `company` VARCHAR(191) NULL,
    MODIFY `phoneNumber` VARCHAR(191) NULL,
    MODIFY `attachements` VARCHAR(191) NULL,
    MODIFY `category` VARCHAR(191) NULL DEFAULT 'Other',
    MODIFY `costAmount` VARCHAR(191) NULL,
    MODIFY `dateCreated` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `priority` VARCHAR(191) NULL DEFAULT 'Normal',
    MODIFY `receipt` VARCHAR(191) NULL,
    MODIFY `status` BOOLEAN NULL DEFAULT false,
    MODIFY `taskNumber` INTEGER NULL,
    MODIFY `telephoneNumber` VARCHAR(191) NULL,
    MODIFY `tenantEmail` VARCHAR(191) NULL,
    MODIFY `tenantName` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL DEFAULT 'Task name';
