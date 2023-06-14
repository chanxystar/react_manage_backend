import { Button, Checkbox, Form, Input } from "antd";
import Cookies from "js-cookie";
import styled, { keyframes } from "styled-components";
import login_img from "@/assets/login_img.png";
import react_icon from "@/assets/react.svg";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { deepColor, theme } from "@/styles/theme";
import { Rotate } from "@/styles/global";
interface Formstate {
  username: string;
  password: string;
  remember: boolean;
}
export default function Login() {
  const navigate = useNavigate();
  //表单数据
  const [form] = Form.useForm<Formstate>();
  const remeChecked = localStorage.getItem("rememberme") ? true : false;

  const onFinish = () => {
    form.validateFields().then(async () => {
      Cookies.set("TOKEN_KEY", "1");
      navigate("/home");
    });
  };

  return (
    <>
      <Container>
        <LoginBg />
        <LoginImage src={login_img} width={600} height={"auto"}></LoginImage>
        <LoginBox>
          <Title><IconBox src={react_icon}></IconBox>ManageBackend</Title>
          <Form
            name="dynamic_rule"
            form={form}
            initialValues={{ remember: remeChecked }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入账号" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="账号(username)"
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="密码(password)"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <LoginButton type="primary" htmlType="submit">
                登录
              </LoginButton>
            </Form.Item>
          </Form>
        </LoginBox>
      </Container>
    </>
  );
}

const fromLeft = keyframes`
  from{ 
    opacity: 0;
    transform: translateX(-50vw);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;
const Container = styled.div`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  animation: ${fromLeft} 0.5s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const LoginBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: -1;
  ::before {
    content: "";
    position: absolute;
    max-width: 1000px;
    min-width: 700px;
    width: 60vw;
    height: 150%;
    background: linear-gradient(
      to bottom,
      ${theme.token.colorPrimary},
      ${deepColor}
    );
    transform: rotateZ(-13deg) translateX(-7%) translateY(-20%);
  }
`;
const fadein = keyframes`

  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

const LoginImage = styled.img`
  margin-right: 10vw;
  animation: ${fadein} 0.5s ease-in-out backwards;
  animation-delay: 0.5s;
`;

const LoginBox = styled.div`
  width: 250px;
  animation: ${fadein} 0.5s ease-in-out backwards;
  animation-delay: 0.5s;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;


const IconBox = styled.img`
  animation: ${Rotate} 4s linear infinite;
  margin-right: 10px;
`
const LoginButton = styled(Button)`
  width: 100%;
`;
