import React, { useState } from 'react';
import { Button } from 'antd';
import Link from 'next/link';

type LoginButtonProps = {
  onLogout?: () => void; 
};

const LoginButton: React.FC<LoginButtonProps> = ({ onLogout }) => {

  const handleLogoutClick = () => {
  
  };

  return (
    <div style={{ position: 'absolute', right: '130px', bottom: '3px', top: '0px' }}>
        <Button type="primary" onClick={handleLogoutClick}>로그아웃</Button>
    </div>
  );
};

export default LoginButton;