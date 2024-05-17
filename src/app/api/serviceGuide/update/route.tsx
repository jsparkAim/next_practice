import prisma from "@/app/lib/prisma";
import dayjs from "dayjs";

// 서비스 안내 수정
export async function POST(request : Request) { 
    const itemId = request.url.split('/').pop();
    console.log('itemId:', itemId);
    const rawData = await request.json();
    console.log('rawData : ',rawData)
    const now = dayjs().add(9, "hours").toISOString();
    // const postResult = await prisma.sv_srvc_gd.update( 
    //     { 
    //         where: { 
    //             gd_no: rawData.gd_no 
    //         }, 
    //         data: { 
    //             gd_ttl: rawData.gd_ttl,      //제목
    //             gd_cont: rawData.gd_cnts,    // 내용
    //             expsr_tf: rawData.expsr_tf,  // 노출여부
    //             modr_no: rawData.modr_no,    // 수정자
    //             mod_dt: now                  // 수정일
    //         }
    // });
    //console.log('postResult : ',postResult)
    return Response.json({res : 'success'})
}