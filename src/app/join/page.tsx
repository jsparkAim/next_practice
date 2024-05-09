"use client";
import React, { useState, useEffect } from 'react';
import type { CascaderProps } from 'antd';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from 'next';

async function joinSubmit(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(name, email, hashedPassword);
        res.status(200).json({ message: '가입 요청이 완료되었습니다.' });
    } else {
        res.status(405).end(); 
    }
}


const App: React.FC = () => {
  return (
    <form method="POST" action="/api/auth">
          <input name="name" type="text" placeholder="이름" /> 
          <input name="email" type="text" placeholder="이메일" />
          <input name="password" type="password" placeholder="비번" />
          <button type="submit">id/pw 가입요청</button>
    </form>
  );
};

export default App;