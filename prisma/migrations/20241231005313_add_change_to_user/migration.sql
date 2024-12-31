/*
  Warnings:

  - Made the column `defaultBillingAddress` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `defaultShippingAddress` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "defaultBillingAddress" SET NOT NULL,
ALTER COLUMN "defaultShippingAddress" SET NOT NULL;
