import prisma from "@/app/lib/prisma";
import dayjs from "dayjs";

export async function POST (request : Request) { // 부서 생성
    const rawData = await request.json();

    const now = dayjs().add(9, "hours").toISOString();

    const postResult = await prisma.sy_clco_dept.create({   
        data: { ...rawData, reg_dt: now, mod_dt: now} 
    });
    console.log(postResult)
    return Response.json({ res: "ok" });
}