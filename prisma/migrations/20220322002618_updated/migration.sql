/*
  Warnings:

  - You are about to drop the column `PasswordHash` on the `users` table. All the data in the column will be lost.
  - Added the required column `passwordHash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT
);
INSERT INTO "new_users" ("createAt", "email", "firstName", "id", "lastName", "updateAt") SELECT "createAt", "email", "firstName", "id", "lastName", "updateAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
