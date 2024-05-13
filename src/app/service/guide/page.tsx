"use client"
import React, { useState, useMemo } from 'react';
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
// import { Router } from 'next/router';
import { useRouter } from "next/navigation";

const App: React.FC = () => {

  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());

  const [value, setValue] = useState({ 
    startDate: new Date(), 
    endDate: new Date().setMonth(11) 
    }); 
    
    const handleValueChange = (newValue : any) => {
    console.log("newValue:", newValue); 
    setValue(newValue); 
    } 

    const register = async() => {
      router.push('/service/guide/register')
    }

 const TABLE_HEAD = ["Name", "Job", "Employed", ""];
  
 const TABLE_ROWS = [
   {
     name: "John Michael",
     job: "Manager",
     date: "23/04/18",
   },
   {
     name: "Alexa Liras",
     job: "Developer",
     date: "23/04/18",
   },
   {
     name: "Laurent Perrier",
     job: "Executive",
     date: "19/09/17",
   },
   {
     name: "Michael Levi",
     job: "Developer",
     date: "24/12/08",
   },
   {
     name: "Richard Gran",
     job: "Manager",
     date: "04/10/21",
   },
 ];
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
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    1
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">Jone Doe</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    jonne62@gmail.com
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a className="text-green-500 hover:text-green-700" href="#">
                      Edit
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a className="text-red-500 hover:text-red-700" href="#">
                      Delete
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    2
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">Jone Doe</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    jonne62@gmail.com
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a className="text-green-300 hover:text-green-700" href="#">
                      Edit
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a className="text-red-500 hover:text-red-700" href="#">
                      Delete
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    3
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">Jone Doe</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    jonne62@gmail.com
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a className="text-green-500 hover:text-green-700" href="#">
                      Edit
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a className="text-red-500 hover:text-red-700" href="#">
                      Delete
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    4
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    Mary Poppins
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    marypoppins@gmail.com
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a className="text-green-300 hover:text-green-700" href="#">
                      Edit
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a className="text-red-500 hover:text-red-700" href="#">
                      Delete
                    </a>
                  </td>
                </tr>
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