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
import RadioButton from '../../ui/join/RadioButton';
import StartToEndDate from '../../ui/join/StartToEndDate';

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const residences: CascaderProps<DataNodeType>['options'] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const App: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };

  // 핸드폰번호 검증 로직
  const valiedatPhoneNumber = (phoneNumberInput : any, value : any) => {
    if (!value.startsWith("010")) { 
      return Promise.reject(new Error(phoneNumberInput.message));
    } else if (value.length !== 11) {
      return Promise.reject(new Error(phoneNumberInput.message));
    } else {
      return Promise.resolve();
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="company"
        label="기업/부서"
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Select placeholder="기업/부서 선택" style={{width : '49%', marginRight : '2%'}}>
          <Option value="ai">에임메드</Option>
          <Option value="hy">하이닉스</Option>
          <Option value="bi">비아트리스</Option>
          <Option value="hp">HPE</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="name"
        label="이름"
        tooltip="What do you want others to call you?"
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="id"
        label="아이디"
        tooltip="What do you want others to call you?"
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input style={{width : '74%', marginRight : '5%'}} />
        <Button type="primary">중복확인</Button>
      </Form.Item>
      
      <Form.Item
        name="email"
        label="이메일"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="비밀번호"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item
        name="confirm"
        label="비밀번호 확인"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item> */}

      <Form.Item
        name="phone"
        label="휴대폰 번호"
        rules={[
          {
            validator: valiedatPhoneNumber,
            message: "올바른 전화번호 양식이 아닙니다.",
          }
       ]}
      >
        <Input style={{ width: '100%' }}/>
      </Form.Item>

      <Form.Item
        name="joinDate"
        label="가입일"
        rules={[{ required: true, message: '가입일을 선택해주세요' }]}
      >
        <StartToEndDate />
      </Form.Item>

      <Form.Item
        name="usePeriod"
        label="사용기간 설정"
        rules={[{ required: true, message: '사용기간을 선택해주세요' }]}
      >
        <RadioButton />
      </Form.Item>


      <Form.Item
        name="authority"
        label="권한"
        rules={[{ required: true, message: '권한을 선택해주세요' }]}
      >
        <Select placeholder="권한그룹구분 선택" style={{width : '49%', marginRight : '2%'}}>
          <Option value="ai">에임메드</Option>
          <Option value="hy">하이닉스</Option>
          <Option value="bi">비아트리스</Option>
          <Option value="hp">HPE</Option>
        </Select>
        <Select placeholder="권한 선택" style={{width : '49%'}}>
          <Option value="sm">시스템마스터</Option>
          <Option value="om">운영마스터</Option>
          <Option value="cs">상담사</Option>
          <Option value="wm">웹시스템마스터</Option>
        </Select>
      </Form.Item>
    

      <Form.Item
        name="adminYn"
        label="관리자 구분"
        rules={[{ required: true, message: '관리자를 선택해주세요' }]}
      >
        <Select placeholder="관리자구분 선택">
          <Option value="master">마스터</Option>
          <Option value="manager">매니저</Option>
          <Option value="customer">고객사</Option>
          <Option value="consultant">상담원</Option>
          <Option value="staff">스태프</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="useYn"
        label="사용여부"
        rules={[{ required: true, message: 'Please select gender!' }]}
      >
        <RadioButton />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;