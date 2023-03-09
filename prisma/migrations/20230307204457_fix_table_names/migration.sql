/*
  Warnings:

  - You are about to drop the `Character` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Clan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_clanId_fkey";

-- DropForeignKey
ALTER TABLE "Character_Images" DROP CONSTRAINT "Character_Images_characterId_fkey";

-- DropTable
DROP TABLE "Character";

-- DropTable
DROP TABLE "Clan";

-- CreateTable
CREATE TABLE "Characters" (
    "id" SERIAL NOT NULL,
    "originalId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "bloodType" TEXT NOT NULL,
    "ocupation" TEXT NOT NULL,
    "afiliation" TEXT NOT NULL,
    "patent" TEXT NOT NULL,
    "register" TEXT NOT NULL,
    "webpage" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "clanId" INTEGER,

    CONSTRAINT "Characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clans" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "webpage" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Clans_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Characters" ADD CONSTRAINT "Characters_clanId_fkey" FOREIGN KEY ("clanId") REFERENCES "Clans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character_Images" ADD CONSTRAINT "Character_Images_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
