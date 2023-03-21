/*
  Warnings:

  - You are about to drop the `apiUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "apiUsers";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
