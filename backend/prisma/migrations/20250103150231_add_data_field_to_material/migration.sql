/*
  Warnings:

  - The values [LINK] on the enum `MaterialType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `path` on the `Material` table. All the data in the column will be lost.
  - Added the required column `data` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MaterialType_new" AS ENUM ('PDF', 'VIDEO', 'IMAGE', 'OTHER');
ALTER TABLE "Material" ALTER COLUMN "type" TYPE "MaterialType_new" USING ("type"::text::"MaterialType_new");
ALTER TYPE "MaterialType" RENAME TO "MaterialType_old";
ALTER TYPE "MaterialType_new" RENAME TO "MaterialType";
DROP TYPE "MaterialType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Material" DROP COLUMN "path",
ADD COLUMN     "data" BYTEA NOT NULL;
