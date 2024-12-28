-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'User');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'User';
