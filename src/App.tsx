import GlobalStyle from "./styles/global";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import Router from "./router/index";
import { useAppDispatch, useAppSelector } from "./store/index";
import "dayjs/locale/zh-cn";
import { genRouteList } from "./utils/routes";
import { baseRoutes } from "./router/routes";
import { useEffect } from "react";
function App() {
  //路由
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch({ type: "routes/setList", payload: genRouteList(baseRoutes) });
  },[])
  //主题
  const theme = useAppSelector((state) => state.theme.config);
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
