import request from "@/util/request";
import { AxiosResponse } from "axios";
import { Permi } from "@/types/permi";
import { IResponseData } from "@/types/axios";
import { role } from "@/types/role";

export function getMenuList(
  data?: any
): Promise<Required<IResponseData<Permi[]>>> {
  return request({
    url: "/permi/all",
    method: "GET",
    data,
  });
}

export function getRoleMenu(data: {
  roleID: string;
}): Promise<Required<IResponseData<string[]>>> {
  return request({
    url: `/menuRole/${data.roleID}`,
    method: "GET",
  });
}

export function editRoleMenu(data: {
  menuIDs: string[];
  roleID: string;
}): Promise<IResponseData<string>> {
  return request({
    url: `/menuRole`,
    method: "PUT",
    data,
  });
}

export function createMenu(data: any): Promise<IResponseData<string>> {
  return request({
    url: "/permi",
    method: "POST",
    data,
  });
}

export function editMenuApi(data: any): Promise<IResponseData<string>> {
  return request({
    url: "/permi",
    method: "PUT",
    data,
  });
}

export function deleteMenu(data: any): Promise<IResponseData<string>> {
  return request({
    url: "/permi",
    method: "DELETE",
    data,
  });
}
