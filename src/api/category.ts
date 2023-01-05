import request from "@/util/request";
import { AxiosResponse } from "axios";
// import { category } from "@/types/category";
import { IResponseData } from "@/types/axios";

export function getCategoryList(
  data?: Partial<{
    categoryName: string;
    pageSize: number;
    pageNum: number;
  }>
) {
  // Promise<
  //   AxiosResponse<{
  //     list: category[];
  //     total: number;
  //   }>
  // >
  return request({
    url: "/article/category",
    method: "GET",
    data,
  });
}

export function addCategory(data: { categoryName: string }) {
  return request({
    url: "/article/category",
    method: "POST",
    data,
  });
}

export function editCategory(data: {
  categoryName: string;
  categoryID: string;
}) {
  return request({
    url: "/article/category",
    method: "PUT",
    data,
  });
}

export function deleteCategory(data: {
  categoryID: string;
}): Promise<IResponseData<string>> {
  return request({
    url: "/article/category",
    method: "DELETE",
    data,
  });
}
