<template>
    <el-breadcrumb separator="/">
        <transition-group mode="out-in" appear name="bc">
            <el-breadcrumb-item v-for="(r, i) in breadcrumb" :key="r.path">
                <span v-if="isCanClick(r)">{{ r.meta.title }}</span>
                <a v-else :href="`#${r.path}`" @click="handleLink(r)">{{ r.meta.title }}</a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { useRoute, RouteLocationMatched, useRouter, RouteRecordRaw } from "vue-router"

let route = useRoute()
const router = useRouter()
let breadcrumb = ref<RouteLocationMatched[]>([])

const getBreadcurmb = function () {
    let map = new Map()
    breadcrumb.value = route.matched.filter(r => {
        if (!map.has(r.meta?.title)) {
            map.set(r.meta.title, true)
            return r
        }
    })
}

function isCanClick(r: RouteRecordRaw) {
    if (r.component?.name !== "Layout") {
        return true
    }
    return false
}

function handleLink(route: RouteLocationMatched) {
    router.push(route.path)
}

getBreadcurmb()
watch(() => route.path, getBreadcurmb)


</script>

<style scoped>
.bc-enter-from,
.bc-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

.bc-enter-to,
.bc-leave-from {
    transform: translateX(0);
    opacity: 1;
}

.bc-enter-active,
.bc-leave-active {
    transition: all 0.3s ease;
}

.bc-move {
    transition: all .5s;
}

.bc-leave-active {
    position: absolute;
}
</style>