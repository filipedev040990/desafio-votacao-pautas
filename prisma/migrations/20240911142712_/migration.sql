-- CreateTable
CREATE TABLE `motion_votting` (
    `id` VARCHAR(191) NOT NULL,
    `motionId` VARCHAR(191) NOT NULL,
    `startVoting` DATETIME(3) NOT NULL,
    `endVoting` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `result_motion_voting` (
    `id` VARCHAR(191) NOT NULL,
    `motionVotingId` VARCHAR(191) NOT NULL,
    `memberDocument` VARCHAR(191) NOT NULL,
    `votingValue` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `motion_votting` ADD CONSTRAINT `motion_votting_motionId_fkey` FOREIGN KEY (`motionId`) REFERENCES `motions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `result_motion_voting` ADD CONSTRAINT `result_motion_voting_motionVotingId_fkey` FOREIGN KEY (`motionVotingId`) REFERENCES `motion_votting`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
