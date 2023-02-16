/*
  Warnings:

  - You are about to drop the `newtable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "newtable";

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sex" CHAR(1) NOT NULL,
    "birthday" DATE NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" DECIMAL(3,2) NOT NULL,
    "bloodType" VARCHAR(20) NOT NULL,
    "ocupation" VARCHAR(100) NOT NULL,
    "afiliation" VARCHAR(100) NOT NULL,
    "patent" VARCHAR(100) NOT NULL,
    "register" VARCHAR(100) NOT NULL,
    "webpage" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character_Images" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Character_Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "webpage" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Clan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clan_Characters" (
    "id" SERIAL NOT NULL,
    "clanId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Clan_Characters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Character_Images" ADD CONSTRAINT "Character_Images_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clan_Characters" ADD CONSTRAINT "Clan_Characters_clanId_fkey" FOREIGN KEY ("clanId") REFERENCES "Clan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clan_Characters" ADD CONSTRAINT "Clan_Characters_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
