/**
 * 这是对axios的二次封装，支持泛型传递
 * @Response 这个类型是根据你的业务需求来定义的，这里只是一个示例
 * 当然你可以自己封装请求库
 */
import { message } from "antd";
import { Response } from "@/types/common";
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";
//二次封装axios
const createAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: Number(import.meta.env.VITE_TIME_OUT),
  withCredentials: true, // 异步请求携带cookie
  headers: {
    // 设置后端需要的传参类型
    "Content-Type": "application/json;charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",
  },
});

//请求拦截器
createAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    /**
     * 在这里写你的拦截逻辑
     */
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//响应拦截
createAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    /**
     * 在这里写你的响应逻辑
     */
    return response.data;
  },
  (error) => {
    message.error(error.message);
    return Promise.reject(error);
  }
);

const request= <T>(options:AxiosRequestConfig): Promise<Response<T>>=>{
  return createAxios(options);
}
export default request;
