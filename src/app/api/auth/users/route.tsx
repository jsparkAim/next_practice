import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
export async function GET() {
    const dataCount = await prisma.sy_clco_dept.count();
    console.log(dataCount)
     //const data = await prisma.sy_clco_dept.findMany();
     //console.log(data)
     return Response.json({ dataCount })
}

export async function POST(request : Request) {
    // const res = await request.json()
    // const formData = await request.formData(); // test 데이터를 create하는거까지 확인하기
    const createData = await prisma.sy_clco_dept.create({ data: await request.json()})
        // data: {
        //     clco_no : 1,
        //     clco_dept_cd : "testcd",
        //     clco_dept_nm : "testnm",
        //     regr_no : 1,
        //     reg_dt : '2024-05-07',
        //     modr_no : 1,
        //     mod_dt : '2024-05-07'
        // }
   // })
    console.log(createData)
    return Response.json({ createData })
}



