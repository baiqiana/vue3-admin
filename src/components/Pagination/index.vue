<template>
    <div class="pagination">
        <el-pagination v-model:current-page="pgState.current" :page-size="pageSize" :page-sizes="pageSizes" background
            :pager-count="pagerCount" layout=" prev, pager, next" :total="total" />
    </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';

const props = withDefaults(defineProps<{
    total?: number,
    pageSize?: number,
    pageNum?: number,
    pagerCount?: number,
    pageSizes?: number[]
}>(), { total: 0, pageSize: 10, pageNum: 1, pagerCount: 7, pageSizes: () => [10, 20, 30] })

const emits = defineEmits(["update:current"])

const pgState = reactive({
    current: 1,
})

watch(() => pgState.current, () => {
    emits("update:current", pgState.current)
})

</script>

<style scoped>
.pagination {
    display: flex;
    margin: 24px
}
</style>