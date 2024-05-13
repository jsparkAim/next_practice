"use client"
import React, { useState } from 'react';
import QuillEditor from '../../../ui/register/QuillEditor';
import DatePicker from 'react-datepicker';
import StartToEndDate from '../../../ui/join/StartToEndDate';
import Datepicker from "react-tailwindcss-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

export default function Layout() {
    const router = useRouter();
    const [expsr_tf, setExpsrTf] = useState('T');
    const [expsr_end_dt_stng_tf, setExpsrEndDtStngTf] = useState('F'); 
    const [expsr_bgng_dt, setExpsrBgngDt] = useState(null);
    const [expsr_end_dt, setExpsrEndDt] = useState(null); 
    const [gd_cont, setGdCont] = useState(''); 
    const [gd_ttl, setGdTtl] = useState(''); 
    const clco_no = 1; // @TODO: 고객사 번호 수정 필요
    
    const handleSave = async () => {

        // 날짜 형식 변환
        let formattedStartDateResult = null;
        let formattedEndDateResult = null;
        if (expsr_bgng_dt) {
            const formattedStartDate = new Date(expsr_bgng_dt);
            formattedStartDateResult = formattedStartDate.toISOString();
        }
        if (expsr_end_dt) {
            const formattedEndDate = new Date(expsr_end_dt);
            formattedEndDateResult = formattedEndDate.toISOString();
        }

        const formData = {
            clco_no,     // 고객사 번호
            expsr_tf,    // 노출여부 
            gd_ttl,      // 안내제목
            expsr_end_dt_stng_tf,   // 종료일 설정 여부
            expsr_bgng_dt : formattedStartDateResult,   // 노출 시작일
            expsr_end_dt : formattedEndDateResult,      // 노출 종료일 
            gd_cont    // 안내내용
        };
        console.log("formData : " , formData)
    
        try {
            const response = await fetch('/api/serviceGuide/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            });
            console.log("response" , response)
      
            if (response.ok) {
                alert('등록완료')
                router.push('/service/guide')
              console.log('service/guide/register data saved successfully');
            } else {
              console.error('Failed to save data:', response.statusText);
            }
          } catch (error) {
            console.error('Error while saving data:', error);
          }
    };

    const list = async() => {
        router.push('/service/guide')
      }

    const handleQuillChange = (gd_cont : any) => {
        setGdCont(gd_cont);
    };

    const handleTitleChange = (gd_ttl : any) => {
        setGdTtl(gd_ttl.target.value);
    };

    // 종료일 검증
    const handleEndDateChange = (date :any) => { // date : 종료일
        if (expsr_bgng_dt!= null && date > expsr_bgng_dt) { 
            setExpsrEndDt(date);
        } else {            
            alert('종료일은 시작일 이후여야 합니다.');
            setExpsrEndDt(expsr_end_dt);
        }
    }


    return (
    <>
        <div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="p-1.5 w-full inline-block align-middle">
                    <div className="text-black text-2xl mt-6 mb-5">서비스 안내 등록 <span className="text-base">/ 서비스 안내 / 기업 관리자</span></div>
                    <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 ">
                        <tbody className="divide-y divide-gray-200 ">
                            <tr>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap bg-slate-300">
                                노출여부
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                <div className="flex items-center">
                                    <input type="radio" id="option1" name="expsr_tf" className="" onChange={()=> setExpsrTf('F')}/>
                                    <label htmlFor="option1" className="flex items-center cursor-pointer ml-2">
                                            N
                                    </label>
                                    <input type="radio" id="option2" name="expsr_tf" className="ml-3" onChange={()=> setExpsrTf('T')} />
                                    <label htmlFor="option2" className="flex items-center cursor-pointer ml-2">
                                            Y
                                    </label>
                                </div> 
                            </td>
                            </tr>
                            <tr>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap bg-slate-300">
                                제목
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                <div>
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        </div>
                                        <input
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
                            </tr>
                            <tr>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap bg-slate-300">
                                노출기간
                            </td>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <input type="radio" id="expsr_true" name="expsr_end_dt_stng_tf" className="" onChange={()=> setExpsrEndDtStngTf('T')} checked={expsr_end_dt_stng_tf === 'T'}/>
                                        <label htmlFor="option1" className="flex items-center cursor-pointer ml-2">
                                                종료일 설정
                                        </label>
                                    </div>
                                    <div>
                                        <input type="radio" id="expsr_false" name="expsr_end_dt_stng_tf" className="" onChange={()=> setExpsrEndDtStngTf('F')} checked={expsr_end_dt_stng_tf === 'F'}/>
                                        <label htmlFor="option2" className="items-center cursor-pointer">
                                                종료일 미설정
                                        </label>
                                    </div>
                                    <div>
                                        시작일 : 
                                        <DatePicker
                                            selected={expsr_bgng_dt}
                                            onChange={(date) => setExpsrBgngDt(date)}
                                            showTimeSelect
                                            dateFormat="Pp"
                                            />
                                    </div>
                                    {expsr_end_dt_stng_tf === 'T' && (
                                        <div>
                                        종료일 : 
                                        <DatePicker
                                            selected={expsr_end_dt}
                                            //onChange={(date) => setExpsrEndDt(date)}
                                            onChange={handleEndDateChange}
                                            showTimeSelect
                                            dateFormat="Pp"
                                            />
                                        </div>
                                    )}
                                    
                                </td>
                            </tr>
                            <tr>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap bg-slate-300">
                                내용
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                <QuillEditor value={gd_cont} onChange={handleQuillChange} />
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
                    </div>
                    <div>
                        <button onClick={ handleSave } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            저장
                        </button>
                        <button onClick={ list } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            목록
                        </button>
                    </div>
                    </div>
                </div>
            </div>
		</div>
      </>
    );
  }