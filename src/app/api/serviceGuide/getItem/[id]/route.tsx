import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const itemId = request.url.split('/').pop();
    console.log('itemId:', itemId);
    const getResult = await prisma.sv_srvc_gd.findUnique({
        where: {
            gd_no: itemId ? parseInt(itemId) : 0
        }
    });

    console.log('getResult >> ', getResult)

   const serializeResult = getResult ? {
       ...getResult,
       gd_no: String(getResult.gd_no),
       clco_no: String(getResult.clco_no),
       regr_no: String(getResult.regr_no),
       modr_no: String(getResult.modr_no)
   } : null;

   console.log('serializeResult : ', serializeResult);
    return NextResponse.json({ res: serializeResult })
}