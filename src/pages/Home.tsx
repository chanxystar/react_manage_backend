import { InfoCircleOutlined, TeamOutlined } from "@ant-design/icons";
import {
  Avatar,
  Calendar,
  Card,
  Col,
  Image,
  Modal,
  Result,
  Row,
  Statistic,
  message,
} from "antd";
import { ReactNode, memo, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import reactLogo from "@/assets/react.png";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/store";
import { ThemeState } from "@/store/modules/theme";

const Home = () => {
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(dayjs(Date.now()).format("YYYY年MM月DD日"));
  }, []);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const themeConfig = useAppSelector((state) => state.theme.config);
  interface SystemRecord {
    icon: ReactNode;
    title: string;
    subTitle: string;
    url: string;
  }
  const systemList: SystemRecord[] = [
    {
      icon: <TeamOutlined style={{ fontSize: 18 }} />,
      title: "React",
      subTitle: "用于构建 Web 和原生交互界面的库",
      url: "https://react.docschina.org/",
    },
    {
      icon: <TeamOutlined style={{ fontSize: 18 }} />,
      title: "Ant Design",
      subTitle:
        "助力设计开发者「更灵活」地搭建出「更美」的产品，让用户「快乐工作」",
      url: "https://ant-design.antgroup.com/index-cn",
    },
    {
      icon: <TeamOutlined style={{ fontSize: 18 }} />,
      title: "Vite",
      subTitle: "下一代前端开发与构建工具",
      url: "https://vitejs.cn/",
    },
  ];
  const SystemCard = ({ item }: { item: SystemRecord }) => {
    const go = () => {
      if (item.url === "") {
        return message.info("该系统还未开放哦，即将上线");
      }
      window.open(item.url, "_blank");
    };
    return (
      <>
        <SystemGrid key={item.url} onClick={go}>
          <Row style={{ marginBottom: 20 }} gutter={[5, 0]} align={"middle"}>
            <Col>{item.icon}</Col>
            <Col>{item.title}</Col>
          </Row>
          <Row style={{ color: "grey" }}>{item.subTitle}</Row>
        </SystemGrid>
      </>
    );
  };

  interface NavigateRecord {
    title: string;
    path: string;
  }
  const navigateList: NavigateRecord[] = [
    {
      title: "货品信息",
      path: "/info/product",
    },
    {
      title: "XX页面",
      path: "/unknown",
    },
    {
      title: "XX页面",
      path: "/unknown",
    },
    {
      title: "XX页面",
      path: "/unknown",
    },
    {
      title: "XX页面",
      path: "/unknown",
    },
  ];
  const dispatch = useAppDispatch();
  const NavigationCard = ({ item }: { item: NavigateRecord }) => {
    const go = () => {
      dispatch({
        type: "tab/navigate",
        payload: {
          key: item.path,
          label: item.title,
        },
      });
    };
    return (
      <>
        <NavigationGrid config={themeConfig} key={item.path} onClick={go}>
          {item.title}
        </NavigationGrid>
      </>
    );
  };
  return (
    <>
      <Row justify={"space-between"} align={"middle"} gutter={[20, 20]}>
        <Col xl={16} lg={24}>
          <Row justify={"start"} align={"middle"} gutter={[100, 0]}>
            <Col span={2}>
              <RotateAvatar
                config={themeConfig}
                size={80}
                icon={<Image src={reactLogo} preview={false} />}
              />
            </Col>
            <Col span={20}>
              <SayHello config={themeConfig}>
                基于React18 AntDesign5 TypeScript 的后台管理系统
              </SayHello>
              <SubHello>
                集成封装了axios、redux、react-router-dom、styled-components等常用库,封装了可配置化的全局主题变量，设置了vite跨域处理，同时预留了权限管理路由的接口，内部实现了单页面页签功能，详情阅读README文档
              </SubHello>
            </Col>
          </Row>
        </Col>
        <Col xxl={4} xl={6} lg={8}>
          <Card
            bordered={false}
            hoverable
            onClick={() => setCalendarOpen(true)}
          >
            <Statistic
              title="你所在的时间线"
              formatter={(value) => <>{value}</>}
              value={date}
              valueStyle={{ color: themeConfig.token.colorPrimary }}
            />
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: 30 }} gutter={[20, 10]}>
        <Col xl={16} lg={24}>
          <Card title="访问其他门户" bodyStyle={{ padding: 0 }}>
            <Row>
              {systemList.map((item, index) => {
                return <SystemCard item={item} key={index} />;
              })}
            </Row>
          </Card>
          <MoreContent>
            <Result
              icon={
                <InfoCircleOutlined
                  style={{ color: themeConfig.token.colorPrimary }}
                />
              }
              title="期待你的开发"
            />
          </MoreContent>
        </Col>
        <Col xl={8} lg={24}>
          <Card title="快捷导航" bodyStyle={{ padding: 0 }}>
            <Row>
              {navigateList.map((item, index) => (
                <NavigationCard item={item} key={index} />
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
      <Modal
        open={calendarOpen}
        width={1300}
        centered
        closable={false}
        footer={null}
        onCancel={() => setCalendarOpen(false)}
      >
        <Calendar />
      </Modal>
    </>
  );
};
const SayHello = styled(Row)`
  font-size: 18px;
  font-weight: 600;
  color: ${(props: ThemeState) => props.config.token.colorPrimary};
  line-height: 36px;
`;

const SubHello = styled(Row)`
  font-size: 14px;
  color: grey;
  line-height: 28px;
`;

const rotate = keyframes`
     from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const RotateAvatar = styled(Avatar)`
  animation: ${rotate} 5s linear infinite;
  background-color: ${(props: ThemeState) => props.config.token.colorPrimary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const SystemGrid = styled(Card.Grid)`
  width: 25%;
  text-align: center;
  cursor: pointer;
`;

const MoreContent = styled(Card)`
  margin-top: 30px;
`;

const NavigationGrid = styled(Card.Grid)`
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  color: ${(props: ThemeState) => props.config.token.colorPrimary};
`;

export default memo(Home);
