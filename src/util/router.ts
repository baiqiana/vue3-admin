import { apiRoute, customRoute } from "@/types/router";
import Layout from "@/layout/index.vue";
import { markRaw } from "Vue";

export function generateRoutes(routes: apiRoute[]): customRoute[] {
  let asyncRoutes: customRoute[] = [];

  routes.sort((a, b) => {
    return (a.orderNum || 0) - (b.orderNum || 0);
  });

  for (const r of routes) {
    const meta = {
      title: r.menuName,
      icon: r.icon,
      hidden: !r.visible,
      isExternal: r.isFrame,
    };

    let routerRoute: customRoute = {
      name: r.path,
      path: r.path,
      meta: meta,
    };

    if (r.menuType === 1 && r.children) {
      if (r.children.length !== 0) {
        routerRoute.children = generateRoutes(r.children);
        if (!r.parentID) {
          routerRoute.component = markRaw(Layout);
        }
      }
      asyncRoutes.push(routerRoute);
    } else if (r.menuType === 2) {
      if (!r.parentID) {
        let parent = routerRoute;
        parent.component = markRaw(Layout);
        parent.children = [
          {
            name: "",
            path: r.path,
            component: () => import(`../${r.component}.vue`),
            meta: meta,
          },
        ];
        asyncRoutes.push(parent);
        continue;
      } else {
        routerRoute.component = () => import(`../${r.component}.vue`);
        asyncRoutes.push(routerRoute);
      }
    }
  }
  return asyncRoutes;
}

export function getShowRoutes(m: customRoute) {
  if (!m.children) {
    return m;
  }
  if (m.children?.length != 0) {
    m.children = m.children.filter((mc) => {
      if (mc.meta?.title === m.meta?.title || mc.path === m.path) {
        return false;
      }
      return true;
    });
  }
  return m;
}
