-- CreateTable
CREATE TABLE "Users_Favorites_Clans" (
    "id" SERIAL NOT NULL,
    "clanId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Users_Favorites_Clans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Favorites_Characters" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Users_Favorites_Characters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Users_Favorites_Clans" ADD CONSTRAINT "Users_Favorites_Clans_clanId_fkey" FOREIGN KEY ("clanId") REFERENCES "Clans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Favorites_Clans" ADD CONSTRAINT "Users_Favorites_Clans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Favorites_Characters" ADD CONSTRAINT "Users_Favorites_Characters_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Favorites_Characters" ADD CONSTRAINT "Users_Favorites_Characters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
