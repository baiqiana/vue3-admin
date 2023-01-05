<template>
    <div v-if="!route.meta?.hidden">
        <template v-if="!isHasChildren">
            <el-menu-item :index="route.path" class="l-noDropdown">
                <template #title>
                    <app-link :isExternal="route.meta?.isExternal" :to="route.path!">
                        <item :path="route.path!" :icon="route.meta?.icon" :title="route.meta?.title"></item>
                    </app-link>
                </template>
            </el-menu-item>
        </template>
        <el-sub-menu v-else :index="route.path!">
            <template #title>
                <item :path="route.path!" :icon="route.meta?.icon" :title="route.meta?.title"></item>
            </template>
            <sidebar-item v:else :route="r" v-for="r in route.children" :key="r.name"></sidebar-item>
        </el-sub-menu>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { customRoute } from "@/types/router"
import AppLink from "./Link.vue"
import Item from "./Item.vue"

const props = defineProps<{
    route: customRoute
}>()
const isHasChildren = computed(function () {
    const children = props.route.children
    if (children && children.length !== 0) {
        return true
    } else {
        return false
    }
})
</script>

<style scoped>

</style>