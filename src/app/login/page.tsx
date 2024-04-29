// // src/app/login/page.tsx
// "use client"
// // import { authenticate } from "@/lib/actions"
// // import { useFormState } from "react-dom"

// export default function Page() {
//   	// 추후에 추가될 로그인 메소드
//     // const [errorMsg, dispatch] = useFormState(authenticate, undefined)
//     return (
//       <div>
//         <h1>로그인 페이지</h1>
//         <form className="flex flex-col"> {/*action={dispatch}*/}  
//             <input className="bg-blue-300 text-black" name="username"></input>
//             <input className="bg-yellow-300 text-black" name="password" type="password"></input>
//             <button>
//                 로그인
//             </button>
//  			{/* 추후에 추가될 에러 메세지
//             <p>{errorMsg}</p> */}
//         </form>
//       </div>
//     )
//   }
"use client";
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

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
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default App;