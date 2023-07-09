/*
  Warnings:

  - You are about to drop the `_BrawlerToTournament` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BrawlerToTournament" DROP CONSTRAINT "_BrawlerToTournament_A_fkey";

-- DropForeignKey
ALTER TABLE "_BrawlerToTournament" DROP CONSTRAINT "_BrawlerToTournament_B_fkey";

-- DropTable
DROP TABLE "_BrawlerToTournament";
