/*
  Warnings:

  - You are about to drop the column `tag` on the `products` table. All the data in the column will be lost.
  - Added the required column `tags` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `tag`,
    ADD COLUMN `tags` VARCHAR(191) NOT NULL;
