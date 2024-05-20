import prisma from "@/app/lib/prisma";
import dayjs from "dayjs";

// 서비스 안내 수정
export async function POST(request : Request) { 
    const { itemNo, ...rawData } = await request.json(); 
    console.log('itemNo : ', itemNo)
    console.log('rawData  : ', rawData)
    const now = dayjs().add(9, "hours").toISOString();
    const postResult = await prisma.sv_srvc_gd.update( 
        { 
            where: { 
                gd_no: itemNo
            }, 
            data: { 
               ...rawData, 
                    reg_dt: now, 
                    mod_dt: now, 
                    modr_no: 1, 
                    regr_no: 1 
            }
    });
    console.log('postResult : ',postResult)
    return Response.json({res : 'success'})
}