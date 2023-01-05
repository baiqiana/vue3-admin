import { defineStore } from "pinia";
import { customRoute } from "@/types/router";

let routerMap = new Map();

interface ITagView {
  tagViews: customRoute[];
}

const tagViewStore = defineStore("tagview", {
  state: (): ITagView => {
    return {
      tagViews: [
        { path: "/", meta: { title: "首页", isAffix: true }, redirect: "" },
      ],
    };
  },

  actions: {
    addViews(route: customRoute) {
      if (route.path !== "/" && !routerMap.has(route.path) && route.meta?.title) {
        this.tagViews.push(route);
        routerMap.set(route.path, true);
      }
    },

    delViews(r: customRoute) {
      let tagViews = this.tagViews;
      let delIndex = tagViews.findIndex((t) => {
        if (t.path === r.path) {
          return true;
        }
      });
      let delViews = tagViews.splice(delIndex, 1)[0];
      routerMap.delete(delViews.path);
      let sibling = tagViews[tagViews.length - 1];

      return [sibling, delViews];
    },
  },
});

export default tagViewStore;
