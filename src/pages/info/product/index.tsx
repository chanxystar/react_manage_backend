import { Button } from "antd";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

function Product() {
  const navigate = useNavigate();
  return (
    <Button type="primary" onClick={() => navigate("/info/product/1")}>
      货品1
    </Button>
  );
}

export default memo(Product);
