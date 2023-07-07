import { HeaderHeight } from "@/styles/config";
import { ConfigProvider, Menu } from "antd";
import styled from "styled-components";
import { MenuItem, getItemInfo, getMenuItem } from "@/utils/index";
import { memo, useEffect, useState } from "react";
import { CallbackItem } from "@/types/common";
import { useAppDispatch, useAppSelector } from "@/store";
import { useLocation, useRouteLoaderData } from "react-router-dom";
import { ThemeState } from "@/store/modules/theme";

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
  // const routes = filterRoutes(routesProps, list)[0].children;
  // const items = routes?.map((item) => {
  //   if (item.meta?.hidden) return;
  //   return getMenuItem(item);
  // }) as MenuItem[];
  const items: any = [];
  const onClick = (e: { key: string }) => {
    console.log(e);

    const res = getItemInfo(e.key, items);
    dispatch({ type: "tab/setActiveTab", payload: activeTab });
    res && menuSelect(res as CallbackItem);
  };
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  useEffect(() => {
    //根据pathname初始化tabs
    if (pathname === "/") {
      menuSelect({ key: "/home", label: "工作台" });
    } else if (pathname !== "/" && !activeTab) {
      const res = getItemInfo(pathname, items);
      res && menuSelect(res as CallbackItem);
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
