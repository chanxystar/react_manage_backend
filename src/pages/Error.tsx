import { useAppDispatch } from "@/store";
import { Button, Result } from "antd";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

//404页面
export const NonExistent = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const goHome = () => {
    dispatch({
      type: "tab/setTabs",
      payload: [
        {
          key: "/home",
          label: "工作台",
        },
      ],
    });
    dispatch({ type: "tab/setActiveTab", payload: "/home" });
    sessionStorage.clear();
    navigate("/home");
  };
  return (
    <>
      <Result
        style={{ margin: "auto" }}
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={
          <Button type="primary" onClick={goHome}>
            回到系统
          </Button>
        }
      />
    </>
  );
});
