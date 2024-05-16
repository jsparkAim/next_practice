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


export default function App() {

    const path = usePathname();
    // gd_no값만 추출
    const itemNo = path.match(/\d+/)?.[0];
    
    const [getItemData, setGetItemData] = useState([]);

    // 서비스 안내 상세 데이터 조회 
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
                    console.log('result : ', result.res);
                    setGetItemData(result.res);
                } else {
                    console.error('response:', response);
                }
            } catch(error) {
                console.error('Error:', error);
            }
        };
        getItem();
    }, [itemNo]);


    return (
        <>
        
      </>
    )
}
