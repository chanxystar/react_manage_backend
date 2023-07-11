import GlobalStyle from "./styles/global";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import Router from "./router/index";
import { useAppSelector } from "./store/index";
import "dayjs/locale/zh-cn";
function App() {
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
