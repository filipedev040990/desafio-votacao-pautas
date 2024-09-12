/*
  Warnings:

  - You are about to drop the `motion_votting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `motion_votting` DROP FOREIGN KEY `motion_votting_motionId_fkey`;

-- DropForeignKey
ALTER TABLE `result_motion_voting` DROP FOREIGN KEY `result_motion_voting_motionVotingId_fkey`;

-- DropTable
DROP TABLE `motion_votting`;

-- CreateTable
CREATE TABLE `motion_voting` (
    `id` VARCHAR(191) NOT NULL,
    `motionId` VARCHAR(191) NOT NULL,
    `startVoting` DATETIME(3) NOT NULL,
    `endVoting` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `motion_voting` ADD CONSTRAINT `motion_voting_motionId_fkey` FOREIGN KEY (`motionId`) REFERENCES `motions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `result_motion_voting` ADD CONSTRAINT `result_motion_voting_motionVotingId_fkey` FOREIGN KEY (`motionVotingId`) REFERENCES `motion_voting`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
