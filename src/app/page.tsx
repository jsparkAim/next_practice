"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Table from './ui/login/Table';


const LoginPage = () => {
  const router = useRouter();
  
  const handleLogin = () => {
    router.push('/'); // login 버튼을 클릭하면 main 화면으로 이동 --> 나중에 Next.auth 하면서 수정 예정
  };

  return (
    <div>
      
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <> 
      {/* <LoginPage /> */}
      <Table  />
    </> 
  );
};

export default App;

