/*
  Warnings:

  - Changed the type of `favGenre1` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `favGenre2` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "favGenre1",
ADD COLUMN     "favGenre1" INTEGER NOT NULL,
DROP COLUMN "favGenre2",
ADD COLUMN     "favGenre2" INTEGER NOT NULL;
