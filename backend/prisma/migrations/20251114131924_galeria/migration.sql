-- CreateTable
CREATE TABLE "Galeria" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Galeria_pkey" PRIMARY KEY ("id")
);
