import { IResponseData } from "@/types/axios";
import request from "@/util/request";
import { Article } from "@/types/article";

export function createArticle(data: any): Promise<IResponseData<Article>> {
  return request({
    url: "/article",
    method: "PUT",
    data,
  });
}

export function getArticleList(
  data: Partial<{ pageSize: number; pageNum: number; title: string }>
): Promise<IResponseData<{ list: Article[]; total: number }>> {
  return request({
    url: "/article",
    method: "GET",
    data,
  });
}

export function getArticleById(id: string): Promise<IResponseData<Article>> {
  return request({
    url: `/article/${id}`,
    method: "GET",
  });
}

export function dedleteArticle(id: string): Promise<IResponseData<string>> {
  return request({
    url: `/article/${id}`,
    method: "DELETE",
  });
}
