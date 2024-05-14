import prisma from "@/app/lib/prisma";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from 'next/server';

// 서비스 안내 목록
export async function GET(request: NextRequest) {
    const getResult = await prisma.sv_srvc_gd.findMany();
    const serializedResult = getResult.map(item => ({
        ...item,
        gd_no: item.gd_no.toString(),
        clco_no: item.clco_no.toString(),
        regr_no : item.regr_no.toString(),
        modr_no : item.modr_no.toString(),
    }));
    console.log('getResult : ',serializedResult)
    return NextResponse.json({ res: serializedResult });
}