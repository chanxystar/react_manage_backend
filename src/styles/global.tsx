import { Row } from "antd";
import styled, { createGlobalStyle, keyframes } from "styled-components";

//全局样式
export default createGlobalStyle`  
*{
    margin: 0;
    padding: 0;
    border: 0px;
  }
*{
  
    //滚动条整体部分
    &::-webkit-scrollbar {
    width: 7px; //y轴滚动条粗细
    height: 7px;
   }
    //滚动条里面的小方块，能上下左右移动（取决于是垂直滚动条还是水平滚动条）
    &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    min-height: 120px; // 滑块高度
    -webkit-box-shadow: inset 0 0px 6px rgba(0, 0, 0, 0.2);
    background: rgba(97,108,114, 0.4);
    }
}
//更改antd的样式
.ant-menu-light .ant-menu-submenu-selected >.ant-menu-submenu-title{
  color: #fff;
}
`;

//subtitle样式
export const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin: 20px 0;
`;

//旋转样式
export const Rotate = keyframes`
   from {
      transform: rotateZ(0deg);
   }
   to{
    transform: rotateZ(360deg);
   }
`;

//路由页面加载spin容器
export const SpinContainer = styled(Row)`
  height: 60vh;
`;
