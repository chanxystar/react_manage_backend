import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
/**
 * 这是一个类似前置路由守卫的功能的高阶组件，用于在跳转时检查登录
 */
export const BeforeRouter = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { pathname } = useLocation();
  const token = Cookies.get("TOKEN_KEY")
  useEffect(() => {
    token? setIsLogin(true) : setIsLogin(false);
  }, [pathname,token]);
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};
