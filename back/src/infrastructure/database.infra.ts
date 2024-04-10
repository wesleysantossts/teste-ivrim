import { PrismaClient } from "@prisma/client";

class Database {
  public readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
}

const prisma = new Database().prisma;

export default prisma;