-- Create MaterialType enum
CREATE TYPE "MaterialType" AS ENUM (
    'PDF',
    'VIDEO',
    'IMAGE',
    'OTHER'
);

-- Create Materials table
CREATE TABLE "Material" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "courseId" VARCHAR NOT NULL,
    "creatorId" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" VARCHAR,
    "type" "MaterialType" NOT NULL,
    "data" BYTEA NOT NULL,
    "size" INTEGER NOT NULL,
    "uploadDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN DEFAULT false
);

-- Create indexes
CREATE INDEX "Material_courseId_idx" ON "Material"("courseId");
CREATE INDEX "Material_creatorId_idx" ON "Material"("creatorId");