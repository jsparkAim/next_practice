import React from 'react';
import { Button } from 'antd';

export default function LoginButton() {
    return (
        <div style={{ position: 'absolute', right: '4px', bottom: '3px' }}>
            <Button type="primary">로그인</Button>
        </div>
    );
}