/*
  Warnings:

  - You are about to drop the `_TeamToTournament` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TeamToTournament" DROP CONSTRAINT "_TeamToTournament_A_fkey";

-- DropForeignKey
ALTER TABLE "_TeamToTournament" DROP CONSTRAINT "_TeamToTournament_B_fkey";

-- DropTable
DROP TABLE "_TeamToTournament";
