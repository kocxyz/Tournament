-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("managerTournamentId") ON DELETE RESTRICT ON UPDATE CASCADE;
