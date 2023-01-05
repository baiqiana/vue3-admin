<template>
    <div>
        <el-form class="search-form" :model="queryConfig" label-width="120px">
            <el-form-item label="角色名称:">
                <el-input v-model="queryConfig.roleName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="search" type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-button @click="addRole" type="primary" size="large">添加</el-button>
        <el-table v-loading="loading" :data="tableData" border style="width: calc(100% - 48px)">
            <el-table-column label="序号" type="index" width="80px">
                <template #default="s">
                    {{ s.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
            <el-table-column label="操作">
                <template #default="data">
                    <span @click="handleMenu(data)" class="primary">菜单权限</span>
                    <span @click="editRole(data)" class="primary">编辑</span>
                    <el-popconfirm @confirm="deleteRole(data)" title="确认删除该角色吗？" confirm-button-text="确认"
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
    <RoleForm @success="getTableData" v-model:show="showFormDialog" :isEdit="isEdit" :editData="editData"></RoleForm>
    <Menu :role="editData" v-model:show="showMenu"></Menu>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue"
import { role } from "@/types/role";
import { getRoleList } from "@/api/role"
import Pagination from "@/components/Pagination/index.vue"
import RoleForm from "./component/form.vue"
import { deleteRole as deleteRoleAPI } from "@/api/role"
import { ElNotification } from "element-plus";
import Menu from "@/components/Menu/index.vue"

const queryConfig = reactive({
    roleName: "",
    pageSize: 100,
    pageNum: 1
})
let total = ref<number>(0)

let tableData = ref<role[]>([])
let loading = ref(false)
let showFormDialog = ref(false)
let isEdit = ref(false)
let editData = ref<Partial<role>>({})
let showMenu = ref(false)

getTableData()

watch(() => queryConfig.pageNum, () => {
    getTableData()
})

async function getTableData() {
    loading.value = true
    const { data } = await getRoleList(queryConfig)
    tableData.value = data.list
    total.value = data.total
    loading.value = false
}

function addRole() {
    showFormDialog.value = true
    isEdit.value = false
}

function editRole(data: any) {
    showFormDialog.value = true
    isEdit.value = true
    editData.value = data.row as role
}

async function deleteRole(data: any) {
    const res = await deleteRoleAPI({ roleID: data.row._id })
    if (res.code === 200) {
        getTableData()
        ElNotification({
            title: "成功",
            message: `\`${data.row.roleName}\`角色删除成功`,
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