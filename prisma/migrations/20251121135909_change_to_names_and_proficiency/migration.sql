/*
  Warnings:

  - You are about to alter the column `proficiency` on the `engineerskill` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(1))`.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_engineerRoleId_fkey`;

-- AlterTable
ALTER TABLE `engineerskill` MODIFY `proficiency` ENUM('BEGINNER', 'NOVICE', 'INTERMEDIATE', 'ADVANCED', 'EXPERT') NOT NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_engineerRoleId_fkey` FOREIGN KEY (`engineerRoleId`) REFERENCES `engineerRole`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `engineerrole` RENAME INDEX `EngineerRole_name_key` TO `engineerRole_name_key`;

-- RenameIndex
ALTER TABLE `engineerskill` RENAME INDEX `EngineerSkill_skillId_fkey` TO `engineerSkill_skillId_fkey`;

-- RenameIndex
ALTER TABLE `engineerskill` RENAME INDEX `EngineerSkill_userId_fkey` TO `engineerSkill_userId_fkey`;
