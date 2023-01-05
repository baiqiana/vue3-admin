<template>
    <div>
        <el-form class="search-form" :model="queryConfig" label-width="120px">
            <el-form-item label="文章标题:">
                <el-input v-model="queryConfig.ArticleName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="search" type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" :data="tableData" border style="width: calc(100% - 48px)">
            <el-table-column label="序号" type="index" width="80px">
                <template #default="s">
                    {{ s.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column prop="title" label="文章标题">
                <template #default="s">
                    {{ s.row.title || "无文章标题" }}
                </template>
            </el-table-column>
            <el-table-column prop="description" label="文章描述"></el-table-column>
            <el-table-column label="文章状态">
                <template #default="s">
                    {{ s.row.status === 1 ? '草稿' : '已发布' }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="data">
                    <span @click="editArticle(data.row)" class="primary">编辑</span>
                    <el-popconfirm @confirm="deleteArticle(data)" title="确认删除该文章吗？" confirm-button-text="确认"
                        cancel-button-text="取消" confirm-button-type="danger" icon-color="red">
                        <template #reference>
                            <span class="danger">删除</span>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <Pagination v-model:current="queryConfig.pageNum" :total="total" :page-size="queryConfig.pageSize"></Pagination>
    </div>

</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue"
import Pagination from "@/components/Pagination/index.vue"
import { getArticleList, dedleteArticle } from "@/api/article"
import { ElNotification } from "element-plus";
import { Article } from "@/types/article";
import { useRouter } from "vue-router"

const queryConfig = reactive({
    ArticleName: "",
    pageSize: 10,
    pageNum: 1
})
let total = ref<number>(0)

let tableData = ref<Article[]>([])
let loading = ref(false)
let router = useRouter()
let editData = ref({})
let showMenu = ref(false)

getTableData()

watch(() => queryConfig.pageNum, () => {
    getTableData()
})

async function getTableData() {
    loading.value = true
    const { data } = await getArticleList(queryConfig)
    tableData.value = data!.list
    total.value = data!.total
    loading.value = false
}


function editArticle(data: any) {
    router.push({ path: `/article/form/${data._id}` })
}

async function deleteArticle(data: any) {
    const res = await dedleteArticle(data.row._id)
    if (res.code === 200) {
        getTableData()
        ElNotification({
            title: "成功",
            message: `删除成功`,
            type: "success"
        })
    }
}

async function handleMenu(data: any) {
    console.log('data:', data.row)
    editData.value = data.row;
    showMenu.value = true
}

function search() {
    queryConfig.pageNum = 1
    getTableData()
}
</script>

<style scoped lang="scss">
@import "@/style/form.scss";
</style>