/*
  Warnings:

  - You are about to drop the column `institutionId` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `wallet` on the `Certificate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tokenId]` on the table `Certificate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `collectionId` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenId` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenUri` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_institutionId_fkey";

-- DropIndex
DROP INDEX "Certificate_wallet_key";

-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "institutionId",
DROP COLUMN "wallet",
ADD COLUMN     "collectionId" TEXT NOT NULL,
ADD COLUMN     "tokenId" BIGINT NOT NULL,
ADD COLUMN     "tokenUri" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CertificateCollection" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CertificateCollection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CertificateCollection_address_key" ON "CertificateCollection"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_tokenId_key" ON "Certificate"("tokenId");

-- AddForeignKey
ALTER TABLE "CertificateCollection" ADD CONSTRAINT "CertificateCollection_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "CertificateCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
