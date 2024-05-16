"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { Card, Typography } from "@material-tailwind/react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import Datepicker from "react-tailwindcss-datepicker"; 
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import { useRouter } from "next/navigation";
import { get } from 'http';
import Link from 'next/link';

const App: React.FC = () => {

  const [dataList, setDataList] = useState<any[]>([]);

  const getList = async () => {
    try {
      const res = await fetch('/api/serviceGuide/list');
      const data = await res.json();
      
      const gdTtlList = data.res.map((item: any) => ({
        gd_ttl: item.gd_ttl,
        expsr_tf: item.expsr_tf,
        gd_no: item.gd_no,
        regr_no: item.regr_no,
        reg_dt: item.reg_dt.slice(0, 10)
      }));
      setDataList(gdTtlList);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  useEffect(() => {
    getList();
  }, []);

  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());

  const [value, setValue] = useState({ 
    startDate: new Date(), 
    endDate: new Date().setMonth(11) 
    }); 
    
    const handleValueChange = (newValue : any) => {
      setValue(newValue); 
    } 

    // 등록페이지 이동
    const register = async() => {
      router.push('/service/guide/register')
    }

  return (
   <>
   <div>
      <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    조회기간
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    2020
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    노출여부
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    N
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    검색어
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    검색어 입력하세요
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div>
      <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    No.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    노출여부
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    제목
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    작성자
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    등록일
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dataList.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {item.gd_no}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {item.expsr_tf}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      <Link href={`/service/guide/getItem/${item.gd_no}`}>
                        {item.gd_ttl}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {item.regr_no}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {item.reg_dt}
                    </td>
                  </tr>
                ))}
                  </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <button onClick={ register } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        등록
    </button>
		</div>
    </>
  );
};

export default App;