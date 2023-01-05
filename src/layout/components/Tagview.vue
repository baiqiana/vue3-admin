<template>
    <div class="l-t-scollbar">
        <el-scrollbar>
            <div ref="tagviewEl" class="l-t-tagviews">
                <router-link @contextmenu.prevent.native="openMenu" :class="isActive(r) ? 't-active' : ''"
                    v-for="r in routes" :to="r.path!" :key="r.path">
                    <div class="l-t-tagview">
                        <span>{{ r.meta?.title }}</span>
                        <span v-if="!isAffix(r)" class="iconfont icon-close l-t-close"
                            @click.prevent="closeTagView(r)"></span>
                    </div>
                </router-link>
            </div>
        </el-scrollbar>
        <!--  -->
        <ul v-show="state.visible" :style="{ left: state.left + 'px', top: state.top + 'px' }" class="l-t-menu">
            <li @click="refresh">刷新</li>
            <li>关闭当前</li>
            <li>关闭其它</li>
            <li>关闭所有</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import tagViewStore from "@/store/tagView"
import { customRoute } from "@/types/router"

const router = useRouter()
const currentRoute = useRoute()

let tagviewEl = ref<HTMLDivElement | null>(null)

interface IState {
    left: number
    top: number
    visible: boolean
}
const state = reactive<IState>({
    left: 0,
    top: 0,
    visible: false
})



let tvStore = tagViewStore()

let routes = tvStore.tagViews


function isAffix(r: customRoute) {
    if (r.meta && r.meta.isAffix) return true
    return false
}

function isActive(r: customRoute) {
    if (r.path === currentRoute.path) return true
    return false
}

function openMenu(e: MouseEvent) {
    let tagviewElDom = tagviewEl.value!.getBoundingClientRect()
    state.left = e.clientX - tagviewElDom.left
    state.top = e.clientY - tagviewElDom.top - 16
    state.visible = true
}

function closeMenu() {
    state.visible = false
}

function refresh() {
    history.go()
}

watch(() => state.visible, (newVal) => {
    if (newVal) {
        window.addEventListener("click", closeMenu)
    } else {
        window.removeEventListener("click", closeMenu)
    }
})

function closeTagView(r: customRoute) {
    let [nextView, devViews] = tvStore.delViews(r)
    if (nextView && currentRoute.path === devViews.path) {
        router.push({ name: nextView.path! })
    }
}

</script>


<style lang="scss" scoped>
.l-t-tagviews {
    display: flex;

}

.l-t-scollbar {
    height: 36px;
    border-bottom: 1px solid rgba(94, 94, 94, 0.1);
    position: relative;
}

.l-t-tagview {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;


    .l-t-close {
        display: inline-block;

        &:before {
            font-size: 10px;
            cursor: pointer;
            display: block;
            width: 16px;
            height: 16px;
            text-align: center;
            line-height: 16px;
            cursor: pointer;
            margin-left: 4px;
        }

        &:hover:before {
            background-color: rgba(92, 90, 90, 0.1);
            border-radius: 50%;
        }
    }


}

.t-active .l-t-tagview {
    background-color: #42b983;
    color: #fff;
    display: flex;
    align-items: center;

    &:before {
        content: "";
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #fff;
        margin-right: 10px;
    }

    .l-t-close {
        &:hover::before {
            background-color: #505768;
        }
    }
}

.l-t-menu {
    position: absolute;
    background-color: #fff;
    width: 80px;
    box-shadow: 1px 2px 2px rgba(94, 94, 94, 0.2);
    border: 1px solid rgba(94, 94, 94, 0.1);
    font-size: 14px;
    padding: 0;
    border-radius: 8px;
    z-index: 999;

    li {
        padding: 8px;
        color: #333;
        cursor: pointer;

        &:hover {
            background-color: rgba(94, 94, 94, 0.1);
        }
    }
}
</style>