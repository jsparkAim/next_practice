"use client"

import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import QuillEditor from '@/app/ui/register/QuillEditor';
import DatePicker from 'react-datepicker';
import StartToEndDate from '@/app/ui/join/StartToEndDate';
import Datepicker from "react-tailwindcss-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import Link from 'next/link'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type sg_createType = {
    clco_no: number;
    gd_cont: string;
    expsr_tf: string;
    gd_ttl: string;
    expsr_end_dt_stng_tf: string;
    expsr_bgng_dt: string;
    expsr_end_dt: string;
}

export default function App() {

    const path = usePathname();
    const itemNo = path.match(/\d+/)?.[0];
    const [getItemData, setGetItemData] = useState([]);
    const router = useRouter();
    const [expsr_tf, setExpsrTf] = useState('Y');
    const [expsr_end_dt_stng_tf, setExpsrEndDtStngTf] = useState('N'); 
    const [expsr_bgng_dt, setExpsrBgngDt] = useState(new Date());
    const [expsr_end_dt, setExpsrEndDt] = useState(new Date()); 
    const [gd_cont, setGdCont] = useState(''); 
    const [gd_ttl, setGdTtl] = useState(''); 
    const clco_no = 1; // @TODO: 고객사 번호 수정 필요
     const [isEditing, setIsEditing] = useState(false);

    const onSubmit = async(data : sg_createType) => {
        console.log('data >> ' , data)

        setIsEditing(false);
        
        // 날짜 형식 변환
        let formattedStartDateResult = null;
        let formattedEndDateResult = null;
        if (expsr_bgng_dt) {
            const formattedStartDate = new Date(expsr_bgng_dt);
            formattedStartDateResult = formattedStartDate.toISOString();
            data.expsr_bgng_dt = formattedStartDateResult;
        }
        if (expsr_end_dt) {
            const formattedEndDate = new Date(expsr_end_dt);
            formattedEndDateResult = formattedEndDate.toISOString();
            data.expsr_end_dt = formattedEndDateResult;
        }
        data.gd_cont = gd_cont;
        data.gd_ttl = gd_ttl;

        const confirmed = window.confirm('저장하시겠습니까?');

        // 업데이트 api
        if (confirmed) {
            try {
                const itemAddData = {
                    itemNo : itemNo,
                    ...data
                }
                console.log('itemAddData : ', itemAddData)
                const response = await fetch('/api/serviceGuide/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemAddData)
                });
                console.log("response" , response)
                if (response.ok) {
                    alert('수정 완료');
                    router.push('/service/guide')    
                } else {
                console.error('Failed to save data:', response.statusText);
                }
            } catch (error) {
                console.error('Error while saving data:', error);
            }
        } else {
            setIsEditing(true);
        }
    }

    // 제목 변경
    const handleTitleChange = (gd_ttl : any) => {
        setGdTtl(gd_ttl.target.value);
    };

    // 내용 변경
    const handleQuillChange = (gd_cont : any) => {
        setGdCont(gd_cont);
    };

    // 삭제 버튼
    const handleDeleteClick = async () => {
        const confirmed = window.confirm('정말 삭제하시겠습니까?');
        if (confirmed) {
            try {
                const response = await fetch(`/api/serviceGuide/delete/${itemNo}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    alert('삭제 성공');
                    router.push('/service/guide')
                } else {
                    console.error('삭제 실패:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    // 수정 버튼
    const handleEditClick = () => {        
        setIsEditing(true);
    }

    
    // 종료일 검증
    const handleEndDateChange = (date :any) => { // date : 종료일
        if (expsr_bgng_dt!= null && date > expsr_bgng_dt) { 
            setExpsrEndDt(date);
        } else {            
            alert('종료일은 시작일 이후여야 합니다.');
            setExpsrEndDt(expsr_end_dt);
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ 
        //resolver: zodResolver(schema),
        defaultValues: {
            clco_no : 1,
            expsr_tf : '',
            expsr_end_dt_stng_tf : '',
            gd_ttl : '',
            expsr_bgng_dt : '',
            expsr_end_dt : '',
            gd_cont : ''
        },
    });

    // 서비스 안내 상세 데이터 조회 api
    useEffect(() => {
         const getItem = async () => {
            try {
                const response = await fetch(`/api/serviceGuide/getItem/${itemNo}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const result = await response.json();
                    console.log('result:', result);
                    setGetItemData(result.res);
                    setExpsrTf(result.res.expsr_tf);
                    setGdTtl(result.res.gd_ttl);
                    setExpsrEndDtStngTf(result.res.expsr_end_dt_stng_tf);
                    setExpsrBgngDt(result.res.expsr_bgng_dt);
                    setExpsrEndDt(result.res.expsr_end_dt);
                    setGdCont(result.res.gd_cont);
                } else {
                    console.error('response:', response);
                }
            } catch(error) {
                console.error('Error:', error);
            }
        };
       getItem()
    }, [itemNo]);
  
    return (
        <>
            <div>
                <div className="flex flex-col">
                    <div className="">
                        <div className="p-1.5 w-full inline-block align-middle">
                            <div className="text-black text-2xl mt-6 mb-5">서비스 안내 등록 <span className="text-base">/ 서비스 안내 / 기업 관리자</span></div>
                            <div className="overflow-hidden border rounded-lg">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <table className="min-w-full divide-y divide-gray-200 ">
                                        <tbody className="divide-y divide-gray-200 ">
                                            <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap bg-slate-300">
                                                노출여부
                                            </td>
                                            {getItemData && 
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <input {...register("expsr_tf")}  disabled={!isEditing} value="N" type="radio" id="option1" name="expsr_tf" className="" checked={expsr_tf === 'N'} onChange={()=> setExpsrTf('N')}/>
                                                        <label htmlFor="option1" className="flex items-center cursor-pointer ml-2">
                                                                N
                                                        </label>
                                                        <input {...register("expsr_tf")}  disabled={!isEditing} value="Y" type="radio" id="option2" name="expsr_tf" className="ml-3"  checked={expsr_tf === 'Y'}onChange={()=> setExpsrTf('Y')} />
                                                        <label htmlFor="option2" className="flex items-center cursor-pointer ml-2">
                                                                Y
                                                        </label>
                                                    </div> 
                                                </td>
                                            }
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap bg-slate-300">
                                                    제목
                                                </td>
                                                {getItemData && 
                                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                        <div>
                                                            <div className="relative mt-2 rounded-md shadow-sm">
                                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                                </div>
                                                                <input
                                                                    {...register("gd_ttl")}
                                                                    disabled={!isEditing}
                                                                    type="text"
                                                                    value={gd_ttl}
                                                                    onChange={handleTitleChange}
                                                                    name="gd_ttl"
                                                                    id="gd_ttl"
                                                                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    placeholder="제목을 입력하세요."
                                                                />
                                                            </div>
                                                        </div>    
                                                    </td>
                                                }
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap bg-slate-300">
                                                    노출기간
                                                </td>
                                                {getItemData && 
                                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <input type="radio" disabled={!isEditing} {...register("expsr_end_dt_stng_tf")} value="Y" id="expsr_true" name="expsr_end_dt_stng_tf" className="" onChange={()=> setExpsrEndDtStngTf('Y')} checked={expsr_end_dt_stng_tf === 'Y'}/>
                                                            <label htmlFor="option1" className="flex items-center cursor-pointer ml-2">
                                                                    종료일 설정
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input type="radio" disabled={!isEditing} {...register("expsr_end_dt_stng_tf")} value="N" id="expsr_false" name="expsr_end_dt_stng_tf" className="" onChange={()=> setExpsrEndDtStngTf('N')} checked={expsr_end_dt_stng_tf === 'N'}/>
                                                            <label htmlFor="option2" className="items-center cursor-pointer">
                                                                    종료일 미설정
                                                            </label>
                                                        </div>
                                                        <div>
                                                            시작일 : 
                                                            <DatePicker
                                                                selected={expsr_bgng_dt}
                                                                onChange={(date) => setExpsrBgngDt(date)}
                                                                disabled={!isEditing}
                                                                showTimeSelect
                                                                dateFormat="Pp"
                                                                />
                                                        </div>
                                                        {expsr_end_dt_stng_tf === 'Y' && (
                                                            <div>
                                                            종료일 : 
                                                            <DatePicker
                                                                selected={expsr_end_dt}
                                                                onChange={handleEndDateChange}
                                                                disabled={!isEditing}
                                                                showTimeSelect
                                                                dateFormat="Pp"
                                                                />
                                                            </div>
                                                        )}
                                                    </td>
                                                }
                                            </tr>
                                            <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap bg-slate-300">
                                                내용
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                <QuillEditor value={gd_cont} readOnly={!isEditing} onChange={handleQuillChange} />
                                            </td>
                                            </tr>
                                            <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap bg-slate-300">
                                                파일첨부
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                파일 첨부 기능 제외
                                            </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {isEditing && (
                                        <div>
                                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                저장
                                            </button>
                                        </div>
                                        )
                                    }
                                    
                                </form> 
                                
                            </div>
                            <div className="flex items-center">
                                    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <Link href="/service/guide" >
                                            목록
                                        </Link>
                                    </div>
                                    {!isEditing && (
                                    <div>
                                        <button onClick={ handleDeleteClick } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            삭제
                                        </button>
                                    </div> 
                                    )}
                                    {!isEditing && (
                                        <div>
                                            <button onClick={ handleEditClick } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                수정
                                            </button>
                                        </div>
                                    )}
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}