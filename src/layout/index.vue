<template>
    <div class="layout">
        <div class="l-sidebar">
            <SideBar></SideBar>
        </div>
        <div class="l-content">
            <Header></Header>
            <Main>
                <RouterView class="main-slot"></RouterView>
            </Main>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "Layout"
}
</script>

<script lang="ts" setup>

import SideBar from "./components/SideBar.vue"
import Header from "./components/Header.vue"
import Main from "./components/Main.vue"

</script>

<style scoped>
.main-slot {
    height: 100%;
}
</style>