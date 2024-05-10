"use client"

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";  

type newUserType = {
    mngr_id : string;
    mngr_pswd: string;
    mngr_nm: string;
    email: string;
    mbph_no: string;
    use_tf : string;
}

const SignUp = () => {
    const schema = z.object({
        mngr_id : z.string(),
        mngr_pswd: z.string().min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
        .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, { message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다." }),
        mngr_nm: z.string(),
        email: z.string().email({ message: "올바른 이메일을 입력해주세요." }),
        mbph_no: z.string().refine(value => value.startsWith('010'), { message: "010으로 시작하는 11자리 숫자를 입력해주세요." })
                        .refine(value => value.length >= 11, { message: "연락처는 11자리여야 합니다." }),
        use_tf : z.string()
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            mngr_id : "",  
            mngr_pswd: "",
            mngr_nm: "",
            email: "",
            mbph_no: "",
            use_tf : ""
        },
    });

    const onSubmit = async (data: newUserType) => {
      try {
        console.log(data);
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
    };

    return (
        <article>
            <section>
                <h1>회원가입</h1>
                <span>필수 정보 입력</span>
            </section>
            <section>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-10">
                    <div>
                        <label htmlFor="mngr_id">관리자 아이디</label>
                        <input type="text" id="mngr_id" {...register("mngr_id")}/>
                        {errors.mngr_id && <p>{errors.mngr_id.message}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="mngr_pswd">비밀번호</label>
                        <input type="password" id="mngr_pswd" {...register("mngr_pswd")}/>
                        {errors.mngr_pswd && <p>{errors.mngr_pswd.message}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="mngr_nm">관리자명</label>
                        <input type="text" id="mngr_nm" placeholder="홍길동" {...register("mngr_nm")}/>
                        {errors.mngr_nm && <p>{errors.mngr_nm.message}</p>}
                    </div>
  
                    <div>
                        <label htmlFor="email">이메일</label>
                        <input type="email" id="email" placeholder="hello@aimmed.com" {...register("email")}/>
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="mbph_no">휴대폰번호</label>
                        <input type="tel" id="mbph_no" placeholder="01012345678" {...register("mbph_no")}/>
                        {errors.mbph_no && <p>{errors.mbph_no.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="use_tf">사용여부</label>
                        <select id="use_tf"  {...register("use_tf")}>
                            <option value="" disabled hidden>역할을 선택해주세요</option>
                            <option value="Y">Y</option>
                            <option value="N">N</option>
                        </select>
                        {errors.use_tf && <p>{errors.use_tf.message}</p>}
                    </div>
                    <button type="submit">등록</button>
                </form>
            </section>
        </article>
    )
}

export default SignUp;