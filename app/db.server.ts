import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export function getDB(url: string) {
  return new PrismaClient({ datasources: { db: { url: url } } }).$extends(
    withAccelerate()
  );
}
