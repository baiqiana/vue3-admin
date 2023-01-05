import type { ILoginInfo } from "@/types/login";
import type { IResponseData } from "@/types/axios";
import { AxiosResponse } from "axios";
import request from "@/util/request";

export function login(
  data: ILoginInfo
): Promise<AxiosResponse<{ token: string; username: string; _id: string }>> {
  return request.post("/user/login", data);
}
