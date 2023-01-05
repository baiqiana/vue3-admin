import axios, { AxiosError } from "axios";
import { ElMessage, ElNotification } from "element-plus";
import { getItem } from "@/util/storage";

// axios.defaults.headers.common["Authorization"] = "";

const request = axios.create({
  baseURL:
    (process.env.BQBLOG_BASE_URL as string) + process.env.BQBLOG_BASE_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config) => {
    const token = getItem("token");
    if (token) {
      (config!.headers || {})["authorization"] = "Bearer " + token;
    }
    if (config.method?.toUpperCase() === "GET" && config.data) {
      config.url += "?";
      for (const key in config.data) {
        let val = config.data[key];
        if (val) {
          config.url += `${key}=${val}&`;
        }
      }
      config.url = config.url?.slice(0, -1);
    }
    return config;
  },
  (error) => {
    // 请求错误
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    showErrorTip(error);
 
    return Promise.reject(error);
  }
);

function showErrorTip(error: any) {
  const msg = error.response.data.msg;
  if (msg) {
    let tip = "";
    if (Array.isArray(msg)) {
      msg.forEach((e: any) => {
        tip += e.msg + ", ";
      });
      tip = tip.slice(0, -2);
    } else {
      tip = msg;
    }

    ElNotification({
      title: "错误",
      type: "error",
      message: tip,
    });
  }
}

export default request;
