import { useAppDispatch, useAppSelector } from "@/store";
import { ClearOutlined } from "@ant-design/icons";
import { Button, Col, ColorPicker, Popover, Row, Space } from "antd";
import { memo } from "react";
import styled from "styled-components";
//主题颜色选择
const ColorSelect = () => {
  const color = useAppSelector(
    (state) => state.theme.config.token.colorPrimary
  );
  const gradient = useAppSelector((state) => state.theme.deepcolor);
  const dispatch = useAppDispatch();
  return (
    <Popover
      trigger="click"
      content={
        <Row justify={"center"} align={"middle"}>
          <Space>
            <ColorCol>
              <span>主题</span>
              <ColorPicker
                value={color}
                onChange={(_, hex) =>
                  dispatch({ type: "theme/changeColor", payload: hex })
                }
              />
            </ColorCol>
            <ColorCol>
              <span>渐变</span>
              <ColorPicker
                value={gradient}
                onChange={(_, hex) =>
                  dispatch({ type: "theme/changeGradient", payload: hex })
                }
              />
            </ColorCol>
          </Space>
        </Row>
      }
    >
      <Button>
        <ClearOutlined />
      </Button>
    </Popover>
  );
};

const ColorCol = styled(Col)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export default memo(ColorSelect);
