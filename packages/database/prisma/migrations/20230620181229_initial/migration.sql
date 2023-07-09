-- CreateEnum
CREATE TYPE "TournamentStatus" AS ENUM ('SIGNUP_CLOSED', 'SIGNUP_OPEN', 'IN_PROGRESS', 'FINISHED');

-- CreateEnum
CREATE TYPE "MatchWinner" AS ENUM ('None', 'TeamA', 'TeamB');

-- CreateTable
CREATE TABLE "Team" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" UUID,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tournament" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TournamentStatus" NOT NULL DEFAULT 'SIGNUP_CLOSED',
    "teamSize" INTEGER NOT NULL,
    "serverId" TEXT NOT NULL,
    "discordSingupMessageId" TEXT,
    "discordOrganizerMessageId" TEXT,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brawler" (
    "id" UUID NOT NULL,
    "discordId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "teamId" UUID,

    CONSTRAINT "Brawler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" UUID NOT NULL,
    "tournamentId" UUID NOT NULL,
    "rootTournamentId" UUID NOT NULL,
    "parentMatchId" UUID,
    "teamAId" UUID,
    "teamBId" UUID,
    "winner" "MatchWinner" NOT NULL DEFAULT 'None',

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchScore" (
    "id" UUID NOT NULL,
    "scoreTeamA" INTEGER NOT NULL,
    "scoreTeamB" INTEGER NOT NULL,
    "matchId" UUID,

    CONSTRAINT "MatchScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CSMember" (
    "discordId" TEXT NOT NULL,
    "twitchName" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "live" BOOLEAN NOT NULL DEFAULT false,
    "server" TEXT NOT NULL,

    CONSTRAINT "CSMember_pkey" PRIMARY KEY ("discordId")
);

-- CreateTable
CREATE TABLE "_TeamToTournament" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_BrawlerToTournament" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_ownerId_key" ON "Team"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Brawler_discordId_key" ON "Brawler"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "Brawler_username_key" ON "Brawler"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Match_rootTournamentId_key" ON "Match"("rootTournamentId");

-- CreateIndex
CREATE UNIQUE INDEX "CSMember_discordId_key" ON "CSMember"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "CSMember_twitchName_key" ON "CSMember"("twitchName");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamToTournament_AB_unique" ON "_TeamToTournament"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamToTournament_B_index" ON "_TeamToTournament"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BrawlerToTournament_AB_unique" ON "_BrawlerToTournament"("A", "B");

-- CreateIndex
CREATE INDEX "_BrawlerToTournament_B_index" ON "_BrawlerToTournament"("B");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Brawler"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brawler" ADD CONSTRAINT "Brawler_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_rootTournamentId_fkey" FOREIGN KEY ("rootTournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_parentMatchId_fkey" FOREIGN KEY ("parentMatchId") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_teamAId_fkey" FOREIGN KEY ("teamAId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_teamBId_fkey" FOREIGN KEY ("teamBId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchScore" ADD CONSTRAINT "MatchScore_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToTournament" ADD CONSTRAINT "_TeamToTournament_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToTournament" ADD CONSTRAINT "_TeamToTournament_B_fkey" FOREIGN KEY ("B") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrawlerToTournament" ADD CONSTRAINT "_BrawlerToTournament_A_fkey" FOREIGN KEY ("A") REFERENCES "Brawler"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrawlerToTournament" ADD CONSTRAINT "_BrawlerToTournament_B_fkey" FOREIGN KEY ("B") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;
