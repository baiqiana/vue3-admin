import type { ILoginInfo } from "@/types/login";
import type { IResponseData } from "@/types/axios";
import { AxiosResponse } from "axios";
import request from "@/util/request";

// : Promise<
//   AxiosResponse<{ token: string; username: string; _id: string }>
// >

export function userRoutes() {
  return request.get("/permi");
}

export function getUserInfo() {
  return request.get("/user");
}
