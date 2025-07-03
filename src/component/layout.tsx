import React, { Suspense } from "react";
import { Layout } from "antd";
import LeftMenu from "./menu";
import { Outlet } from "react-router-dom";
import { KeepAlive } from "react-activation";

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => (
    <Layout style={{ height: '100vh' }} className="home-wrapper">
        <Sider>
            <LeftMenu />
        </Sider>
        <Layout>
            <Header className="home-header">Header</Header>
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