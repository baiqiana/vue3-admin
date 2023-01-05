import request from "@/util/request";

export function getPolicy(): Promise<{
  OSSAccessKeyId: string;
  host: string;
  key: Date;
  policy: string;
  signature: string;
  success_action_status: number;
}> {
  return request({
    url: "/policy",
    method: "GET",
  });
}
