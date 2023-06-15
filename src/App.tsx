import GlobalStyle from "./styles/global";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import Router from "./router/index";
import { routesProps } from "./router/routes";
import { useAppDispatch, useAppSelector } from "./store/index";
import { useEffect } from "react";
import { genRouteList } from "./utils";
import "dayjs/locale/zh-cn";

function App() {
  /**
   * 根据路由表生成路由,现在是静态路由表
   * @routesProps 静态的路由表
   * 如果需要从后端获取路由表,可以在这里过滤后传给genRouteList方法，存入store中
   */
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({ type: "routes/setList", payload: genRouteList(routesProps) });
  }, []);

  const theme = useAppSelector((state) => state.theme.config)
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <ConfigProvider theme={theme} locale={zhCN}>
        <Router />
      </ConfigProvider>
    </>
  );
}

export default App;
