import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { getItem } from "@/util/storage";
import getUserStore from "@/store/userStore";
import getMenuStore from "@/store/userMenu";
import getTagViewStore from "@/store/tagView";
import { customRoute } from "@/types/router";
import Layout from "@/layout/index.vue";
import { markRaw } from "Vue";
import nprogress from "nprogress";

export type RouteConfig = RouteRecordRaw & {
  hidden?: Boolean;
  meta?: {
    isExternal: boolean;
    icon: string;
    title: string;
  };
};

const routes: RouteConfig[] = [
  { path: "/login", component: () => import("@/views/login/index.vue") },
];

const router = createRouter({
  routes: routes as RouteConfig[],
  history: createWebHashHistory(),
});

router.beforeEach(async (to, from, next) => {
  nprogress.start();
  const userStore = getUserStore();
  const menuStore = getMenuStore();
  const token = getItem("token");

  if (token) {
    try {
      if (userStore.roles.length === 0) {
        await userStore.getUserInfo();
      }
      if (!menuStore.isLoadRoutes) {
        await menuStore.getUserRoutes();

        menuStore.isLoadRoutes = true;
        menuStore.addRouters.forEach((r) => {
          if (r.path) {
            router.addRoute(r as unknown as RouteRecordRaw);
          }
        });
        router.addRoute({
          path: "/:pathMatch(.*)",
          component: markRaw(Layout),
        });
        const redirectPath = from.query.redirect || to.path;
        const redirect = decodeURIComponent(redirectPath as string);
        const nextData =
          to.path === redirect ? { ...to, replace: true } : { path: redirect };
        return next(nextData);
      }
    } catch (error: any) {
      console.log("error:", error);
      const code = error.response.data.code;
      if (code === 401) {
        localStorage.clear();
        next("/login");
      }
    }

    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
  } else {
    if (to.path !== "/login") {
      next(`/login?redirect=${to.fullPath}`);
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  nprogress.done();
});

router.beforeResolve(async (to, from, next) => {
  const tagViewStore = getTagViewStore();
  tagViewStore.addViews(to as unknown as customRoute);
  next();
});

export default router;
