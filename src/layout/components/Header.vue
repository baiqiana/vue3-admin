<template>
    <div class="l-navbar">
        <!-- 顶部 -->
        <div class="l-n-top">
            <div class="l-n-title">
                <span class="l-n-icon iconfont icon-nav-collapse"></span>
                <Breadcrumb></Breadcrumb>
            </div>

            <el-dropdown trigger="click">
                <div class="l-b-avator">
                    <img class="l-b-a-img"
                        src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" />
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <router-link to="/">首页</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <a href="https://github.com/baiqiana/vue3-admin" target="_blank">项目地址</a>
                        </el-dropdown-item>
                        <el-dropdown-item @click="logout" divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <!-- tagview -->
        <TagView></TagView>
    </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import Breadcrumb from "./Breadcrumb.vue"
import TagView from "./Tagview.vue"

function logout() {
    window.localStorage.clear()
    router.push({path: "/login"})
}
</script>

<style scoped lang="scss">
.l-n-top {
    padding: 8px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(94, 94, 94, 0.1);
}

.l-n-icon {
    margin-right: 8px;
    cursor: pointer;
}

.l-n-title {
    display: flex;
    align-items: center;
}

.l-n-routerLink {
    color: #303133;
    font-size: 14px;
}

.l-n-disabled {
    font-size: 14px;
    color: #97a8be;
}



.l-b-a-img {
    border-radius: 12px;
    width: 40px;
    height: 40px;
    cursor: pointer;
}
</style>