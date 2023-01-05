import { createApp } from "Vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Router from "@/router/index";
import App from "./App.vue";
import "@/style/index.scss";
import "@/style/font/iconfont.css";
import { createPinia } from "pinia";
import "nprogress/nprogress.css";

const app = createApp(App);

app.use(Router);

app.use(createPinia());

app.use(ElementPlus);

app.mount("#app");

app.config.errorHandler = (err, component, info) => {};
