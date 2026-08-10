-- CreateEnum
CREATE TYPE "role" AS ENUM ('SUPER_ADMIN', 'PHARMACY');

-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('FREE_TRIAL', 'PAID');

-- CreateEnum
CREATE TYPE "SubscriptionDuration" AS ENUM ('ONE_MONTH', 'THREE_MONTHS', 'SIX_MONTHS', 'ONE_YEAR');

-- CreateTable
CREATE TABLE "Pharmacy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "licenseId" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "subscriptionType" "SubscriptionType" NOT NULL,
    "duration" "SubscriptionDuration",
    "startDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pharmacy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pharmacy_name_key" ON "Pharmacy"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pharmacy_licenseId_key" ON "Pharmacy"("licenseId");

-- CreateIndex
CREATE UNIQUE INDEX "Pharmacy_contactEmail_key" ON "Pharmacy"("contactEmail");
