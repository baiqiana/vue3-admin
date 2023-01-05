<template>
    <component :is="componentType" :to="to" class="router-link-exact-active" @click="testClick">
        <slot name="default"></slot>
    </component>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()
const props = defineProps<{
    isExternal?: boolean
    to: string
}>()

const componentType = computed(() => {
    if (props.isExternal) {
        return "a"
    } else {
        return "router-link"
    }
})

function testClick() {
    router.push(props.to)
}
</script>

<style scoped lang="scss">
.router-link-exact-active {
    color: inherit;
    text-decoration: none;
    width: 100%;
}
</style>