export interface Article {
  author: string;
  body: string;
  crteateTime: string;
  description: string;
  likes: number;
  status: number;
  tagList: Tag[];
  title: "";
  updateTime: "";
  __v: number;
  _id: string;
}

export interface Tag {
  crteateTime: string;
  updateTime: "";
  __v: number;
  _id: string;
}
