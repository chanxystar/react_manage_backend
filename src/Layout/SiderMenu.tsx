import { HeaderHeight } from "@/styles/config";
import { ConfigProvider, Menu } from "antd";
import styled from "styled-components";
import { exchangeRoutes, getMenus } from "@/utils/routes";
import { memo, useEffect, useMemo, useState } from "react";
import { CallbackItem } from "@/types/common";
import { useAppDispatch, useAppSelector } from "@/store";
import { useLocation, useRouteLoaderData } from "react-router-dom";
import { ThemeState } from "@/store/modules/theme";
import { baseRoutes } from "@/router/routes";
import { Meta } from "@/router/index.d";

interface Props {
  menuSelect: (value: CallbackItem) => void;
}
const SiderMenu = ({ menuSelect }: Props) => {
  const activeTab = useAppSelector((state) => state.tab.activeTab);
  const themeConfig = useAppSelector((state) => state.theme.config);
  const deepcolor = useAppSelector((state) => state.theme.deepcolor);
  const themeStyle = {
    token: {
      //悬停背景色
      colorBgTextHover: "white",
      colorText: themeConfig.token.colorPrimary,
    },
  };
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  //处理生成菜单数据
  const { list } = useAppSelector((state) => state.routes);
  const items = useMemo(() => {
    return getMenus(exchangeRoutes(baseRoutes, list));
  }, [list]);

  const onClick = (e: { key: string; item: any }) => {
    menuSelect({
      key: e.key,
      label: e.item.props.title,
    });
  };
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  //根据pathname初始化tabs
  const label = (useRouteLoaderData(pathname) as Meta | undefined)?.title;
  useEffect(() => {
    if (pathname === "/") {
      menuSelect({ key: "/home", label: "工作台" });
    } else if (pathname !== "/" && !activeTab) {
      if (!label) return;
      menuSelect({
        key: pathname,
        label,
      });
    }
  }, []);
  useEffect(() => {
    let key = "";
    for (const item of items) {
      (item as any).children?.map((child: any) => {
        child.key === activeTab && (key = (item as any).key);
      });
    }
    setOpenKeys([key]);
  }, [activeTab]);
  return (
    <ConfigProvider theme={themeStyle}>
      <MenuContainer
        onSelect={onClick}
        mode="inline"
        openKeys={openKeys}
        onOpenChange={(keys) => setOpenKeys(keys)}
        selectedKeys={[activeTab]}
        items={items}
        config={themeConfig}
        deepcolor={deepcolor}
      ></MenuContainer>
    </ConfigProvider>
  );
};

const MenuContainer = styled(Menu)`
  background: linear-gradient(
    to bottom,
    ${(props: ThemeState) => props.config.token.colorPrimary},
    ${(props: ThemeState) => props.deepcolor}
  );
  color: white;
  height: calc(100vh - ${HeaderHeight});
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export default memo(SiderMenu);
