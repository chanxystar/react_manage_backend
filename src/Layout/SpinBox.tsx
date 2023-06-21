import { Spin } from "antd";
import { SpinContainer } from "@/styles/global";
import { ReactNode, Suspense } from "react";

const SpinBox = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <SpinContainer justify={"center"} align={"middle"}>
          <Spin size="large"></Spin>
        </SpinContainer>
      }
    >
      {children}
    </Suspense>
  );
};

export default SpinBox;
