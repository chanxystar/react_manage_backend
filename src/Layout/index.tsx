import {
  Layout as AntdLayout,
  Button,
  Row,
  Space,
  Tag,
} from "antd";
import { memo, useCallback, useState } from "react";
import styled from "styled-components";
import SiderMenu from "./SiderMenu";
import { HeaderHeight } from "@/styles/config";
import logo from "@/assets/react.png";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import RouterTabs from "./RouterTabs";
import KeepAlive from "./KeepAlive";
import { CallbackItem } from "@/types/common";
import { Rotate } from "@/styles/global";
import { ThemeState } from "@/store/modules/theme";
import ColorSelect from "@/components/ColorSelect";
const { Header, Sider, Content } = AntdLayout;

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const loginOut = () => {
    dispatch({ type: "user/logout" });
    navigate("/login", { replace: true });
  };
  const themeConfig = useAppSelector((state) => state.theme.config);
  const tabs = useAppSelector((state) => state.tab.tabs);
  const menuSelect = useCallback(
    (value: CallbackItem) => {
      dispatch({
        type: "tab/navigate",
        payload: {
          label: value.label,
          key: value.key,
          isMenu: true
        },
      });
    },
    [tabs]
  );
  return (
    <>
      <AntdLayout style={{ height: "100vh" }}>
        <LaySider collapsed={collapsed} width={200} collapsible trigger={null}>
          <SiderTitle config={themeConfig}>
            <TitleLogo src={logo} width={30} height={30} alt="logo"></TitleLogo>
            {!collapsed && <TitleFont>Manage Backend</TitleFont>}
          </SiderTitle>
          <SiderMenu menuSelect={menuSelect}></SiderMenu>
        </LaySider>
        <AntdLayout>
          <LayHeader>
            <Button onClick={() => setCollapsed((pre) => !pre)}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Row align={"middle"}>
              <Space>
                <UserTag icon={<UserOutlined />} bordered={false}>
                  admin
                </UserTag>
                <ColorSelect />
                <Button type="primary" onClick={loginOut}>
                  退出登录
                </Button>
              </Space>
            </Row>
          </LayHeader>
          <LayContent>
            <RouterTabs />
            <Container>
              <KeepAlive tabs={tabs}></KeepAlive>
            </Container>
          </LayContent>
        </AntdLayout>
      </AntdLayout>
    </>
  );
};
const LaySider = styled(Sider)`
  height: 100vh;
  transition: all 0.3s;
`;
const LayHeader = styled(Header)`
  height: ${HeaderHeight};
  background-color: white;
  //下部阴影
  box-shadow: 0 2px 8px #f0f1f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;
const LayContent = styled(Content)`
  display: flex;
  flex-flow: column nowrap;
  padding: 1%;
  padding-top: 0;
  box-sizing: border-box;
`;

const Container = styled.div`
  box-shadow: 0 2px 8px #f0f1f2;
  border-radius: 15px;
  padding: 20px;
  flex-shrink: 0;
  flex-grow: 0;
  height: calc(100vh - 140px);
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: white;
  overflow-x: hidden;
`;

const SiderTitle = styled.div`
  height: ${HeaderHeight};
  width: 100%;
  background-color: ${(props: { config: ThemeState["config"] }) =>
    props.config.token.colorPrimary};
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
`;
const TitleLogo = styled.img`
  animation: ${Rotate} 4s linear infinite;
`;
const TitleFont = styled.div`
  white-space: nowrap;
  font-size: 16px;
  color: white;
  margin-left: 10px;
`;
const UserTag = styled(Tag)`
  height: 32px;
  line-height: 32px;
  font-size: 14px;
`;


export default memo(Layout);
