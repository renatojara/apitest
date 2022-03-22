/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `edgeJob` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "edgeJob";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "PasswordHash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT
);

-- CreateTable
CREATE TABLE "edgeJobs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "edgeJobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
