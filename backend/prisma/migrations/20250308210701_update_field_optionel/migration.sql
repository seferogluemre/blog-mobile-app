-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PostComment" ALTER COLUMN "created_at" DROP NOT NULL;
