-- CreateTable
CREATE TABLE `article` (
    `id` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `title` TEXT NOT NULL,
    `content` LONGTEXT NOT NULL,
    `classify` TEXT NULL,
    `coverImg` TEXT NULL,
    `summary` TEXT NOT NULL,
    `source` TEXT NULL,
    `views` INTEGER NOT NULL DEFAULT 1,
    `likes` INTEGER NOT NULL DEFAULT 1,
    `favorites` INTEGER NOT NULL DEFAULT 1,
    `showNumber` INTEGER NOT NULL DEFAULT 1,
    `status` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,
    `isDeleted` INTEGER NULL DEFAULT 0,

    UNIQUE INDEX `article_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
