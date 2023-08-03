import { HeaderHeight } from "@/styles/config";
import { ConfigProvider, Menu } from "antd";
import styled from "styled-components";
import { filterToMenu, getMenus } from "@/utils/menu";
import { memo, useEffect, useMemo, useState } from "react";
import { CallbackItem } from "@/types/common";
import { useAppDispatch, useAppSelector } from "@/store";
import { useLocation } from "react-router-dom";
import { ThemeState } from "@/store/modules/theme";
import { baseRoutes } from "@/router/routes";
import { getRoute } from "@/utils/router";

interface Props {
  menuSelect: (value: CallbackItem) => void;
}
const SiderMenu = ({ menuSelect }: Props) => {
  const activeKey = useAppSelector((state) => state.tab.activeKey);
  const themeConfig = useAppSelector((state) => state.theme.config);
  const deepcolor = useAppSelector((state) => state.theme.deepcolor);
  const themeStyle = {
    token: {
      //悬停背景色
      colorBgTextHover: "white",
      colorText: themeConfig.token.colorPrimary,
    },
  };
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  //处理生成菜单数据
  const items = useMemo(() => {
    return getMenus(filterToMenu(baseRoutes));
  }, []);
  const onClick = ({
    key,
    item,
  }: {
    key: string;
    item: any;
  }) => {
    dispatch({
      type: "tab/navigate",
      payload: {
        key,
        label: item.props.title,
        isMenu: true,
      },
    });
  };
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  //根据pathname初始化tabs
  useEffect(() => {
    if (pathname === "/") {
      menuSelect({ key: "/home", label: "工作台" });
    } else if (pathname !== "/") {
      const currentRoute = getRoute(pathname,baseRoutes); 
      if (currentRoute?.path) {
        //如果不是菜单路由，则不触发菜单选择
        if (currentRoute.meta.hidden) {
          dispatch({
            type: "tab/navigate",
            payload: {
              key: currentRoute.path,
              label: currentRoute.meta.title,
              isMenu: false,
            },
          });
        } else {
          menuSelect({
            key: currentRoute.path,
            label: currentRoute.meta.title,
          });
        }
      }
    }
  }, [pathname]);

  //根据activeKey来检索当前需要展开的菜单
  useEffect(() => {
    let key = "";
    for (const item of items) {
      (item as any).children?.map((child: any) => {
        child.key === activeKey && (key = (item as any).key);
      });
    }
    key===""?setOpenKeys([]): setOpenKeys([key]);
  }, [activeKey]);
  return (
    <ConfigProvider theme={themeStyle}>
      <MenuContainer
        onSelect={onClick}
        mode="inline"
        openKeys={openKeys}
        onOpenChange={(keys) => setOpenKeys(keys)}
        selectedKeys={[activeKey]}
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
