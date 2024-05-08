"use client";
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import {
  AutoComplete,
  Cascader,
  Col,
  InputNumber,
  Row,
  Select,
} from 'antd';
import { signIn } from "../../auth";
import bcrypt from 'bcrypt';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import {Link, Route} from "react-router-dom";
import { useActionState } from 'react';

const [form] = Form.useForm()

const LoginForm : React.FC = () => {
  const onFinish = async (values: any) => {
    // console.log('Received values of form: ', values); // key , value
    try{
       const result = await signIn('credentials', { 
         id : values.id,
         password : values.password
         
      });
    } catch (error) {
      console.error('Failed to sign in:', error);
    } 
  };

  return (
    <Form
      form = {form}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{width: '50%'}}
      
    >
      <Form.Item
         name="company"
         rules={[{ required: true, message: '기업을 선택하세요.' }]}
      >
        <Select placeholder="기업 선택">
          <Select.Option value="1">SK HYNIX</Select.Option>
          <Select.Option value="2">에임메드</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="id"
        rules={[{ required: true, message: '아이디를 입력하세요.' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="아이디" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: '비밀번호를 입력하세요.' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="비밀번호"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          로그인
        </Button>
        {/* <LoginButton /> */}
        <a className="login-form-forgot" href="">
          아이디 찾기
        </a>
        <span>|</span>
        <a className="login-form-forgot" href="">
           비밀번호 찾기
        </a>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;