import React, { Suspense } from "react";
import { Layout } from "antd";
import LeftMenu from "./menu";
import { Outlet } from "react-router-dom";
import { KeepAlive } from "react-activation";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';

const { Header, Sider, Content } = Layout;

const menu = (
    <Menu>
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => {
            // 退出逻辑
            localStorage.removeItem('token');
            window.location.href = '/login';
        }}>
            退出
        </Menu.Item>
    </Menu>
);

const AppLayout: React.FC = () => (
    <Layout style={{ height: '100vh' }} className="home-wrapper">
        <Sider>
            <LeftMenu />
        </Sider>
        <Layout>
            <Header className="home-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,padding: '0 16px'}}>
                <span>Header</span>
                <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                    <Avatar
                        style={{ backgroundColor: '#87d068', cursor: 'pointer', marginLeft: 16 }}
                        icon={<UserOutlined />}
                    />
                </Dropdown>
            </Header>
            <Content>
                <KeepAlive>
                    <Suspense fallback={<div>加载中...</div>}>
                        <Outlet /> {/* 这里必须有，否则子路由页面不会显示 */}
                    </Suspense>
                </KeepAlive>
            </Content>
        </Layout>
    </Layout>
);

export default AppLayout;