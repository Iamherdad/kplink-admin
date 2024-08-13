import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};

const LayoutCom: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (item: { key: string }) => {
    console.log(item);
    navigate(`/${item.key}`, { replace: true });
  };

  const labels = [
    {
      label: "插件管理",
      key: "extension",
      icon: React.createElement(UserOutlined),
      onClick: handleItemClick,
    },
    {
      label: "核心管理",
      key: "core",
      icon: React.createElement(VideoCameraOutlined),
      onClick: handleItemClick,
    },
  ];

  const items: MenuProps["items"] = labels.map((item, index) => ({
    key: item.key,
    icon: item.icon,
    label: item.label,
    onClick: item.onClick,
  }));

  return (
    <Layout hasSider style={{ height: "100%" }}>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname.split("/")[1] || "extension"]}
          items={items}
        />
      </Sider>
      <Layout style={{ marginInlineStart: 200 }}>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              width: "100%",
              height: "100%",
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutCom;
