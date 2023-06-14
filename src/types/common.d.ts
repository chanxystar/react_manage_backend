//接口返回值
export interface Response<T> {
  succeed: boolean;
  code: number;
  codeMsg: string;
  data: T;
}


//Layout中回调函数传参类型
export interface CallbackItem {
  key: string;
  label: string;
}

//列表返回类型
export interface ListRes<T> {
  total: number;
  pageIndex: number;
  pageSize: number;
  rows: T[];
}
