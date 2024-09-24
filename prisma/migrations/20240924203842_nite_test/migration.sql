/*
  Warnings:

  - The primary key for the `AttendanceList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AttendanceList` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `AttendanceList` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `endTime` DATETIME(3) NULL,
    ADD COLUMN `startTime` DATETIME(3) NULL,
    ADD PRIMARY KEY (`meetingId`, `userId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_sessionToken_key` ON `User`(`sessionToken`);
