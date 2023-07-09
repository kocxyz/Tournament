/*
  Warnings:

  - A unique constraint covering the columns `[managerTournamentId]` on the table `Tournament` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "managerTournamentId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_managerTournamentId_key" ON "Tournament"("managerTournamentId");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("managerTournamentId") ON DELETE RESTRICT ON UPDATE CASCADE;
