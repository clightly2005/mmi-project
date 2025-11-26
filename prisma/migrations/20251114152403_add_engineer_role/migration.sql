-- AlterTable
ALTER TABLE `user` ADD COLUMN `engineerRoleId` INTEGER NULL;

-- CreateTable
CREATE TABLE `EngineerRole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EngineerRole_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_engineerRoleId_fkey` FOREIGN KEY (`engineerRoleId`) REFERENCES `EngineerRole`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
