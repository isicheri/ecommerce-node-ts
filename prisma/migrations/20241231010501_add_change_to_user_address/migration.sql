-- AlterTable
ALTER TABLE "users" ALTER COLUMN "defaultBillingAddress" DROP NOT NULL,
ALTER COLUMN "defaultShippingAddress" DROP NOT NULL;
