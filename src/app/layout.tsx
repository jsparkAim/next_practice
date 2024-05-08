"use client"
import { AntdRegistry } from '@ant-design/nextjs-registry';
import LogoutButton from './ui/login/LogoutButton';
import type { MenuProps, Button } from 'antd';
import Link from 'next/link';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MailOutlined, 
  SettingOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/navigation';

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