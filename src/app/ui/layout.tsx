
"use client"
import React, { useEffect, useState } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
//import LogoutButton from './ui/login/LogoutButton';
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

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const getItems: MenuItem[] = [
  getItem(<Link href={'/'}>home</Link>, '0', <PieChartOutlined />) ,
  getItem('시스템 운영관리', '1', <PieChartOutlined />, [
    getItem('1-1', '2'),
    getItem('1-2', '3'),
    getItem('1-3', '4'),
  ]),
  getItem('서비스 운영관리', '5', <DesktopOutlined />, [
    getItem('2-1', '6'),
    getItem('2-2', '7'),
    getItem('2-3', '8'),
  ]),
  getItem('기업관리자', '9', <UserOutlined />, [
    getItem(<Link href={'/board/guide'}>서비스안내</Link>, '10'),
    getItem('모바일 보건센터', '11'),
    getItem('프로젝트 회원관리', '12'),
  ]),
  getItem('서비스 관리', 'sub2', <TeamOutlined />, [getItem('Team 1', '13'), getItem('Team 2', '14')]),
  getItem('건강정보 파일', '15', <FileOutlined />),
];

const { Header, Content, Footer, Sider } = Layout;

const items2 = new Array(3).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));

const items: MenuProps['items'] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

export default function MainLayout({ children }: React.PropsWithChildren){
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <>
            <Header
                style={{
                position: 'fixed',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                }}
            >
                {/* <LogoutButton /> */}
            </Header>
            <Layout hasSider>
                <Layout style={{ minHeight: '100vh', marginTop : '54px' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" />
                    <Menu 
                        theme="dark" 
                        defaultSelectedKeys={['1']} 
                        mode="inline" 
                        items={getItems} />
                </Sider>
                {children}
                <Layout>
                    <Footer style={{ textAlign: 'center' }}>
                    </Footer>
                </Layout>
                </Layout> 
            </Layout> 
          </>
    )
}