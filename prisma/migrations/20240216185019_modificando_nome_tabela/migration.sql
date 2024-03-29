/*
 Warnings:
 
 - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
 
 */
-- DropTable
DROP TABLE "User";
-- CreateTable
CREATE TABLE "users" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "permission" "Permission" NOT NULL DEFAULT 'standard',
  "phone" TEXT NOT NULL,
  "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");