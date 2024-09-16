/*
  Warnings:

  - You are about to drop the `motion_voting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `result_motion_voting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `motion_voting` DROP FOREIGN KEY `motion_voting_motionId_fkey`;

-- DropForeignKey
ALTER TABLE `result_motion_voting` DROP FOREIGN KEY `result_motion_voting_motionVotingId_fkey`;

-- DropTable
DROP TABLE `motion_voting`;

-- DropTable
DROP TABLE `result_motion_voting`;

-- CreateTable
CREATE TABLE `voting_session` (
    `id` VARCHAR(191) NOT NULL,
    `motionId` VARCHAR(191) NOT NULL,
    `startVoting` DATETIME(3) NOT NULL,
    `endVoting` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `result_voting_session` (
    `id` VARCHAR(191) NOT NULL,
    `votingSessionId` VARCHAR(191) NOT NULL,
    `memberDocument` VARCHAR(191) NOT NULL,
    `votingValue` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `voting_session` ADD CONSTRAINT `voting_session_motionId_fkey` FOREIGN KEY (`motionId`) REFERENCES `motions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `result_voting_session` ADD CONSTRAINT `result_voting_session_votingSessionId_fkey` FOREIGN KEY (`votingSessionId`) REFERENCES `voting_session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
