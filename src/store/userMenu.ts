import { defineStore } from "pinia";
import { userRoutes } from "@/api/user";
import { generateRoutes, getShowRoutes } from "@/util/router";
import { apiRoute, customRoute } from "@/types/router";

interface menuState {
  routers: apiRoute[];
  addRouters: customRoute[];
  tagRouters: customRoute[];
  isLoadRoutes: boolean;
}

const userMenuStore = defineStore("menu", {
  state: (): menuState => {
    return {
      routers: [],
      addRouters: [],
      tagRouters: [],
      isLoadRoutes: false,
    };
  },

  getters: {
    menuRoute(state): customRoute[] {
      let routers: customRoute[] = [];
      state.addRouters.forEach((m) => {
        if (m.path && m.component) {
          routers.push(getShowRoutes(m));
        }
      });
      return routers;
    },
  },

  actions: {
    async getUserRoutes() {
      const { data: routes } = await userRoutes();
      //   this.routers = routes;
      this.routers = routes;
      const asyncRoutes = generateRoutes(routes);
      // asyncRoutes.push({
      //   path: "/:pathMatch(.*)",
      //   component: shallowRef(Error),
      // });
      this.addRouters = asyncRoutes;
    },

    getShowRoute() {},
  },
});

export default userMenuStore;
