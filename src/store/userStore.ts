import { defineStore } from "pinia";
import { getUserInfo } from "@/api/user";

interface UserInfoStore {
  permissions: string[];
  roles: string[];
  user: UserInfo;
}

interface UserInfo {
  _id: string | number;
  avatar: string;
  username: string;
}

const userStore = defineStore("user", {
  state: (): UserInfoStore => {
    return {
      permissions: [],
      roles: [],
      user: {
        _id: 0,
        avatar: "",
        username: "",
      },
    };
  },

  getters: {
    getPermissions(): string[] {
      return this.permissions;
    },
    getRoles(): string[] {
      return this.roles;
    },
    getUser(): UserInfo {
      return this.user;
    },
  },

  actions: {
    async getUserInfo() {
      const { data } = await getUserInfo();
      this.roles.push(data.roleID);
      this.user = {
        _id: data._id,
        username: data.username,
        avatar: data.avatar || "",
      };
    },
  },
});

export default userStore;
