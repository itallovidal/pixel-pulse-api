/*
  Warnings:

  - Changed the type of `gameID` on the `rating` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "rating" DROP COLUMN "gameID",
ADD COLUMN     "gameID" INTEGER NOT NULL;
