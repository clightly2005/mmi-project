import { PrismaClient } from '@prisma/client'
import 'server-only'
//never import to client^

//global object - like window but for node
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

//creates prisma client or reuses cached one if one exists 
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })

  //hot reload for local dev so dont need to keep creating prisma client (connection spam) but in prod, dont need to do caching
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
