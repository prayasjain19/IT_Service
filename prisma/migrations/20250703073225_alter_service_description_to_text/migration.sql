/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Service` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `service` MODIFY `description` TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Service_title_key` ON `Service`(`title`);
