-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "teamId" UUID;

-- CreateTable
CREATE TABLE "_BrawlerToParticipant" (
    "A" UUID NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BrawlerToParticipant_AB_unique" ON "_BrawlerToParticipant"("A", "B");

-- CreateIndex
CREATE INDEX "_BrawlerToParticipant_B_index" ON "_BrawlerToParticipant"("B");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrawlerToParticipant" ADD CONSTRAINT "_BrawlerToParticipant_A_fkey" FOREIGN KEY ("A") REFERENCES "Brawler"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrawlerToParticipant" ADD CONSTRAINT "_BrawlerToParticipant_B_fkey" FOREIGN KEY ("B") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
