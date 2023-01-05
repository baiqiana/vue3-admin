import request from "@/util/request";
import { AxiosResponse } from "axios";
import { role } from "@/types/role";
import { IResponseData } from "@/types/axios";

export function getRoleList(data: { roleName: string }): Promise<
  AxiosResponse<{
    list: role[];
    total: number;
  }>
> {
  return request({
    url: "/role/list",
    method: "GET",
    data,
  });
}

export function addRole(data: { roleName: string }) {
  return request({
    url: "/role",
    method: "POST",
    data,
  });
}

export function editRole(data: { roleName: string; roleID: string }) {
  return request({
    url: "/role",
    method: "PUT",
    data,
  });
}

export function deleteRole(data: {
  roleID: string;
}): Promise<IResponseData<string>> {
  return request({
    url: "/role",
    method: "DELETE",
    data,
  });
}
