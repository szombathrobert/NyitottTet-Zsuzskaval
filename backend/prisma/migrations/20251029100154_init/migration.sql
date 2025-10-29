-- CreateTable
CREATE TABLE "Kezeles" (
    "id" SERIAL NOT NULL,
    "cim" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tartalom" TEXT NOT NULL,
    "ar" TEXT,
    "kepUrl" TEXT,
    "letrehozva" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modositva" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kezeles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kep" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "cim" TEXT,
    "letrehozva" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kezeles_slug_key" ON "Kezeles"("slug");
