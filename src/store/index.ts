import { configureStore } from "@reduxjs/toolkit";

import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

// 引入每一个reducer
import tab from "./modules/tab";
import routes from "./modules/routes";
export const store = configureStore({ reducer: { tab, routes } });

// 全局定义 dispatch和state的类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// 后面使用过程中直接从该文件中引入,而不需要冲react-redux包中引入
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
