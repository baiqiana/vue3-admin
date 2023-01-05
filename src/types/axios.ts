export interface IResponseData<T> {
  code: number;
  msg: string;
  data?: T;
}
