import { ReactNode } from "react";
 interface Meta{
    hidden?:boolean;
    icon?:ReactNode;
    title:string;
}
export interface RouteRecord {
  path:string;
  index?:boolean;
  element?:ReactNode;
  children?:RouteRecord[];
  name?:string;
  meta?:Meta
}

interface RoutesList {
  path: string;
  children?: RoutesList[];
}


export interface BaseRoute{
  path:string;
  element?:ReactNode;
  id?:string;
  children?:BaseRoute[];
  loader?:()=>Meta
}