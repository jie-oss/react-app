import React, { Suspense } from "react";
import { Layout } from "antd";
import LeftMenu from "./menu";
import { Outlet } from "react-router-dom";
import { UserOutlined, LogoutOutlined, GlobalOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { FormattedMessage } from "react-intl";

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

const languageMenu = (
    <Menu
        onClick={({ key }) => {
            // 这里可以切换语言逻辑，比如存localStorage或调用i18n
            localStorage.setItem('lang', key);
            window.location.reload(); // 或者用i18n.changeLanguage(key)
        }}
    >
        <Menu.Item key="zh">简体中文</Menu.Item>
        <Menu.Item key="en">English</Menu.Item>
    </Menu>
);

const AppLayout: React.FC = () => (
    <Layout style={{ height: '100vh' }} className="home-wrapper">
        <Sider>
            <LeftMenu />
        </Sider>
        <Layout>
            <Header className="home-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
                <span><FormattedMessage id='header' /></span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Dropdown overlay={languageMenu} placement="bottomRight" trigger={['click']}>
                        <span style={{ cursor: 'pointer', marginRight: 16 }}>
                            <GlobalOutlined style={{ fontSize: 20, verticalAlign: 'middle' }} /> 切换语言
                        </span>
                    </Dropdown>
                    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                        <Avatar
                            style={{ backgroundColor: '#87d068', cursor: 'pointer', marginLeft: 0 }}
                            icon={<UserOutlined />}
                        />
                    </Dropdown>
                </div>
            </Header>
            <Content>
                <Suspense fallback={<div>加载中...</div>}>
                    <Outlet /> {/* 这里必须有，否则子路由页面不会显示 */}
                </Suspense>
            </Content>
        </Layout>
    </Layout>
);

export default AppLayout;