import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("NyitottTerZsuzskaval0727", 10);

  const admin = await prisma.admin.create({
    data: {
      username: "CzZsuzska",
      password: hashed,
    },
  });

  console.log("Admin létrehozva:", admin);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
