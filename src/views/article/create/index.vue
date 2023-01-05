<template>
    <div style="height: 100%">
        <Suspense>
            <Editor :articleID="articleID"></Editor>
            <template #fallback>error</template>
        </Suspense>
    </div>
</template>

<script setup lang="ts">
import Editor from "@/components/Editor/index.vue"
import { useRoute } from "vue-router"
import { ref, watch } from "vue"
const route = useRoute()

const articleID = route.params.articleID as string
console.log('route.params:', route.params)

</script>

<style scoped>

</style>