/**
 * 这是一个封装的axios调用的实例
 * @any 这里出现的any类型是为了演示
 * 实际上传入正确的接口定义类型，更有助于开发效率
 */

import request from "@/utils/request";

export const getListApi = (params:any)=>{
  return request<any>({
    url: "/api/list",
    method:'get',
    params
  })
}