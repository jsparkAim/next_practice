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

const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
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
        <a className="login-form-forgot" href="">
          아이디 찾기
        </a>
        <span>|</span>
        <a className="login-form-forgot" href="">
           비밀번호 찾기
        </a>
        {/* Or <a href="">register now!</a> */}
      </Form.Item>
    </Form>
  );
};

export default App;