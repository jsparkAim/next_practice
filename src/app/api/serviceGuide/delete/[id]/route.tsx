import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request : NextRequest) {
    const url = request.url; 
    console.log('URL:', url);

    const pathname = new URL(url).pathname;
    console.log('pathname : ', pathname);

    const itemId = pathname.split('/').pop(); 
    console.log('itemId:', itemId);

    const getResult = await prisma.sv_srvc_gd.delete({
        where: {
            gd_no : itemId ? parseInt(itemId) : 0
        }
    });

   console.log('getResult >> ', getResult)
    return NextResponse.json({res : 'success'})
}