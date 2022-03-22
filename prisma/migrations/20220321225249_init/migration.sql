-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "PasswordHash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT
);

-- CreateTable
CREATE TABLE "edgeJob" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT NOT NULL
);
