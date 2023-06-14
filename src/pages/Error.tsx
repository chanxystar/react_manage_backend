import { useAppDispatch, useAppSelector } from "@/store";
import { Button, Result } from "antd";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//404页面
export const NonExistent = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.routes);
  const [visable, setVisable] = useState(false);
  useEffect(()=>{
     setVisable(!loading)
  },[loading])
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
      {visable && (
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
      )}
    </>
  );
});

//非法页面
export const IllegalPage = memo(() => {
  return <></>;
});
