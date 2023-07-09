/*
  Warnings:

  - You are about to drop the `Match` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MatchScore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_parentMatchId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_rootTournamentId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_teamAId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_teamBId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_tournamentId_fkey";

-- DropForeignKey
ALTER TABLE "MatchScore" DROP CONSTRAINT "MatchScore_matchId_fkey";

-- DropTable
DROP TABLE "Match";

-- DropTable
DROP TABLE "MatchScore";

-- DropEnum
DROP TYPE "MatchWinner";
