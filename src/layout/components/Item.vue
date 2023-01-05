<template>
    <div class="l-s-content">
        <el-icon>
            <span v-if="icon" class="iconfont icon" :class="`icon-${icon}`"></span>
        </el-icon>
        <span>{{ title }}</span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    icon?: string
    title?: string
}>()

const { icon, title } = props

</script>

<style lang="scss" scoped>
.icon {
    margin-right: 10px;
    position: relative;
    top: -1px;
}
</style>