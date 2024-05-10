"use client"
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './global.css';

const RootLayout = ({ children }: React.PropsWithChildren) => {

  return (
    <html lang="en">
      <body style={{ marginLeft : '-1px' }}>
        <AntdRegistry>
            {children}
        </AntdRegistry>
      </body>
    </html>
    );
  };

export default RootLayout;