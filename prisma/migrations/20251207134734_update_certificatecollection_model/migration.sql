/*
  Warnings:

  - Added the required column `type` to the `CertificateCollection` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CollectionType" AS ENUM ('Certificate', 'Degree');

-- AlterTable
ALTER TABLE "CertificateCollection" ADD COLUMN     "type" "CollectionType" NOT NULL;
