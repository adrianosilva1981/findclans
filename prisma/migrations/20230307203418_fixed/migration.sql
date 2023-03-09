/*
  Warnings:

  - You are about to drop the `Clan_Characters` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Clan_Characters" DROP CONSTRAINT "Clan_Characters_characterId_fkey";

-- DropForeignKey
ALTER TABLE "Clan_Characters" DROP CONSTRAINT "Clan_Characters_clanId_fkey";

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "clanId" INTEGER,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "originalId" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "sex" SET DATA TYPE TEXT,
ALTER COLUMN "birthday" SET DATA TYPE TEXT,
ALTER COLUMN "height" SET DATA TYPE TEXT,
ALTER COLUMN "weight" SET DATA TYPE TEXT,
ALTER COLUMN "bloodType" SET DATA TYPE TEXT,
ALTER COLUMN "ocupation" SET DATA TYPE TEXT,
ALTER COLUMN "afiliation" SET DATA TYPE TEXT,
ALTER COLUMN "patent" SET DATA TYPE TEXT,
ALTER COLUMN "register" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Clan_Characters";

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_clanId_fkey" FOREIGN KEY ("clanId") REFERENCES "Clan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
