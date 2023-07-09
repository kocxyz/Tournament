-- CreateEnum
CREATE TYPE "StageType" AS ENUM ('ROUND_ROBIN', 'SINGLE_ELIMINATION', 'DOUBLE_ELIMINATION');

-- CreateEnum
CREATE TYPE "GrandFinalType" AS ENUM ('NONE', 'SIMPLE', 'DOUBLE');

-- CreateEnum
CREATE TYPE "RoundRobinMode" AS ENUM ('SIMPLE', 'DOUBLE');

-- CreateEnum
CREATE TYPE "SeedOrdering" AS ENUM ('NATURAL', 'REVERSE', 'HALF_SHIFT', 'REVERSE_HALF_SHIFT', 'PAIR_FLIP', 'INNER_OUTER', 'GROUPS_EFFORT_BALANCED', 'GROUPS_SEED_OPTIMIZED', 'GROUPS_BRACKET_OPTIMIZED');

-- CreateEnum
CREATE TYPE "MatchResult" AS ENUM ('WIN', 'DRAW', 'LOSS');

-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('LOCKED', 'WAITING', 'READY', 'RUNNING', 'COMPLETED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "ParticipantMatchResult" (
    "id" SERIAL NOT NULL,
    "participantId" INTEGER,
    "position" INTEGER,
    "forfeit" BOOLEAN,
    "score" INTEGER,
    "result" "MatchResult",
    "opponent1MatchId" INTEGER,
    "opponent2MatchId" INTEGER,

    CONSTRAINT "ParticipantMatchResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantMatchGameResult" (
    "id" SERIAL NOT NULL,
    "participantId" INTEGER,
    "position" INTEGER,
    "forfeit" BOOLEAN,
    "score" INTEGER,
    "result" "MatchResult",
    "opponent1MatchGameId" INTEGER,
    "opponent2MatchGameId" INTEGER,

    CONSTRAINT "ParticipantMatchGameResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stage" (
    "id" SERIAL NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "StageType" NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "stageId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Round" (
    "id" SERIAL NOT NULL,
    "stageId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "status" "MatchStatus" NOT NULL,
    "stageId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "roundId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "childCount" INTEGER NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchGame" (
    "id" SERIAL NOT NULL,
    "status" "MatchStatus" NOT NULL,
    "stageId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "MatchGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StageSettings" (
    "id" UUID NOT NULL,
    "stageId" INTEGER NOT NULL,
    "size" INTEGER,
    "seedOrdering" "SeedOrdering"[],
    "balanceByes" BOOLEAN,
    "matchesChildCount" INTEGER,
    "groupCount" INTEGER,
    "roundRobinMode" "RoundRobinMode",
    "manualOrdering" JSONB,
    "consolationFinal" BOOLEAN,
    "skipFirstRound" BOOLEAN,
    "grandFinal" "GrandFinalType",

    CONSTRAINT "StageSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantMatchResult_opponent1MatchId_key" ON "ParticipantMatchResult"("opponent1MatchId");

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantMatchResult_opponent2MatchId_key" ON "ParticipantMatchResult"("opponent2MatchId");

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantMatchGameResult_opponent1MatchGameId_key" ON "ParticipantMatchGameResult"("opponent1MatchGameId");

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantMatchGameResult_opponent2MatchGameId_key" ON "ParticipantMatchGameResult"("opponent2MatchGameId");

-- CreateIndex
CREATE UNIQUE INDEX "StageSettings_stageId_key" ON "StageSettings"("stageId");

-- AddForeignKey
ALTER TABLE "ParticipantMatchResult" ADD CONSTRAINT "ParticipantMatchResult_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantMatchResult" ADD CONSTRAINT "ParticipantMatchResult_opponent1MatchId_fkey" FOREIGN KEY ("opponent1MatchId") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantMatchResult" ADD CONSTRAINT "ParticipantMatchResult_opponent2MatchId_fkey" FOREIGN KEY ("opponent2MatchId") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantMatchGameResult" ADD CONSTRAINT "ParticipantMatchGameResult_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantMatchGameResult" ADD CONSTRAINT "ParticipantMatchGameResult_opponent1MatchGameId_fkey" FOREIGN KEY ("opponent1MatchGameId") REFERENCES "MatchGame"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantMatchGameResult" ADD CONSTRAINT "ParticipantMatchGameResult_opponent2MatchGameId_fkey" FOREIGN KEY ("opponent2MatchGameId") REFERENCES "MatchGame"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchGame" ADD CONSTRAINT "MatchGame_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchGame" ADD CONSTRAINT "MatchGame_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageSettings" ADD CONSTRAINT "StageSettings_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
