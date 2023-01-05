export interface Permi {
  children: Permi[];
  createTime: Date;
  icon: string;
  isAffix: boolean;
  isFrame: boolean;
  menuName: string;
  menuType: number;
  orderNum: number;
  parentID: string | null;
  path: string;
  status: boolean;
  updateTime: Date;
  visible: boolean;
  __v: number;
  _id: string;
}
