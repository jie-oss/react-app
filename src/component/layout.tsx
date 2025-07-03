import React from "react";
import { Layout } from "antd";
import LeftMenu from "./menu";

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layout style={{ height: '100vh' }} className="home-wrapper">
    <Sider>
      <LeftMenu />
    </Sider>
    <Layout>
      <Header className="home-header">Header</Header>
      <Content>
        {children}
      </Content>
    </Layout>
  </Layout>
);

export default AppLayout;