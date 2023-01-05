import { defineComponent } from "Vue";

type Component<T = any> = ReturnType<typeof defineComponent>;

export interface apiRoute {
  createTime?: string;
  updateTime?: string;
  menuName: string;
  parentID?: string;
  path?: string;
  component?: string | Component;
  isFrame?: boolean;
  menuType: number;
  visible?: boolean;
  status?: boolean;
  icon?: string;
  orderNum?: number;
  children?: apiRoute[];
}

export interface RouteMeta {
  title: string;
  icon?: string;
  hidden?: boolean;
  isExternal?: boolean;
  isAffix?: boolean;
}

export interface customRoute {
  name?: string;
  path?: string;
  meta?: RouteMeta;
  component?: Component | string;
  children?: customRoute[];
  redirect?: string;
}
