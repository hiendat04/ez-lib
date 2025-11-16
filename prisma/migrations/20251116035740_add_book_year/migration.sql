-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "year" INTEGER;

-- CreateIndex
CREATE INDEX "Book_year_idx" ON "Book"("year");
