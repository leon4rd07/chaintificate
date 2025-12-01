/*
  Warnings:

  - You are about to drop the column `description` on the `JobVacancy` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `JobVacancy` table. All the data in the column will be lost.
  - Added the required column `category` to the `JobVacancy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `JobVacancy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `JobVacancy` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `JobVacancy` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Technology', 'Business', 'Health', 'Education', 'Entertainment');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('FullTime', 'PartTime');

-- AlterTable
ALTER TABLE "JobVacancy" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "category" "Category" NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "jobDescription" TEXT[],
ADD COLUMN     "jobRequirements" TEXT[],
ADD COLUMN     "position" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "Type" NOT NULL;
