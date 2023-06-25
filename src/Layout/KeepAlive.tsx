import { useAppDispatch, useAppSelector } from "@/store";
import { useUpdate } from "ahooks";
import { Row, Spin } from "antd";
import { Suspense, memo, useEffect, useRef, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import styled from "styled-components";
interface Props {
  tabs: {
    key: string;
    label: string;
  }[];
}
function KeepAlive({ tabs }: Props) {
  const componentList = useRef(new Map());
  const activeTab = useAppSelector((state) => state.tab.activeTab);
  const outLet = useOutlet();
  const { pathname } = useLocation();
  const loading = useAppSelector((state) => state.tab.loading);
  const dispatch = useAppDispatch();
  const forceUpdate = useUpdate();

  const [endloading, setEndLoading] = useState(false);
  useEffect(() => {
    if (!componentList.current.has(pathname)) {
      componentList.current.set(pathname, outLet);
    }
    forceUpdate();
  }, [pathname, endloading, activeTab]);
  useEffect(() => {
    componentList.current.forEach((_value, key) => {
      if (!tabs.some((tab) => tab.key === key)) {
        componentList.current.delete(key);
      }
    });

    forceUpdate();
  }, [tabs]);
  useEffect(() => {
    if (loading) {
      componentList.current.delete(pathname);
      setEndLoading((pre) => !pre);
      dispatch({ type: "tab/reload", payload: false });
    }
  }, [loading]);
  return (
    <div>
      {Array.from(componentList.current).map(([key, component]) => (
        <div key={key} style={{ display: pathname === key ? "block" : "none" }}>
          <Suspense
            fallback={
              <SpinContainer justify={"center"} align={"middle"}>
                <Spin size="large"></Spin>
              </SpinContainer>
            }
          >
            {component}
          </Suspense>
        </div>
      ))}
    </div>
  );
}
const SpinContainer = styled(Row)`
  height: 60vh;
`;
export default memo(KeepAlive);
