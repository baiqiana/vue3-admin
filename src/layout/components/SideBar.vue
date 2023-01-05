<template>
    <el-menu :active-text-color="variables.menuActiveColor" :background-color="variables.menuBg"
        class="el-menu-vertical" :default-active="route.path" :text-color="variables.menuTextColor">
        <div class="ls-logo">
            <img class="ls-l-img" src="@/assets/avatar.jpg" alt="" />
            <h1 class="ls-title">白千后台</h1>
        </div>
        <el-scrollbar height="calc(100vh - 52px)">
            <SidebarItem :route="r" v-for="r in menuStore.menuRoute" :key="r.path"></SidebarItem>
        </el-scrollbar>
    </el-menu>
</template>

<script lang="ts" setup>
import variables from "@/style/variables.module.scss"
import SidebarItem from "./SidebarItem.vue"
import { useRouter, useRoute } from "vue-router"
import { customRoute } from "@/types/router";
import userMenuStore from "@/store/userMenu"
import { computed } from "vue"

const route = useRoute()
// const router = useRouter()
// const routes = router.getRoutes() as unknown as customRoute[]
const menuStore = userMenuStore()
// const menu = computed(() => {
//     return userMenuStore.addRouters.map(m => { 

//     })
// })
</script>

<style scoped lang="scss">
:deep(.el-menu--collapse .el-sub-menu__icon-arrow) {
    display: none !important;
}
</style>