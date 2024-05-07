import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
     return Response.json({ message: 'get success' })
}

export async function POST(req : Request) {
     const count = await prisma.sy_clco_dept.count();
     const createData = await prisma.sy_clco_dept.create({
          data : {
               "clco_no"      : 1,
               "clco_dept_cd" : "testcd",
               "clco_dept_nm" : "testnm",
               "regr_no"      : 1,
               "reg_dt"       : new Date().toISOString(),
               "modr_no"      : 1,
               "mod_dt"       : new Date().toISOString()
               }
     });
     return Response.json({ message: 'post success' })
}

POST({} as Request)
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })







