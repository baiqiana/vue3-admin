<template>
    <div>
        <el-form class="search-form" :model="queryConfig" label-width="120px">
            <el-form-item label="菜单名称:">
                <el-input v-model="queryConfig.menuName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="search" type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-button @click="addMenu" type="primary" size="large">添加</el-button>
        <el-table :data="tableData" style="width: calc(100% - 48px); margin-bottom: 20px" row-key="_id" border>
            <el-table-column width="80px" prop="orderNum" label="排序"></el-table-column>
            <el-table-column prop="menuName" label="菜单名称" />
            <el-table-column label="图标" width="80px">
                <template #default="scope">
                    <span class="iconfont" :class="`icon-${scope.row.icon}`"></span>
                </template>
            </el-table-column>>
            <el-table-column prop="component" label="组件路径"></el-table-column>
            <el-table-column prop="path" label="路由路径"></el-table-column>
            <el-table-column label="菜单类型">
                <template #default="scope">
                    {{ MenuType[scope.row.menuType?.toString()] }}
                </template>
            </el-table-column>
            <el-table-column width="160px" prop="permi" label="权限标识"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template #default="data">
                    <span @click="editMenu(data.row)" class="primary">修改</span>
                    <span @click="addMenuByMenu(data.row)" class="primary">新增</span>
                    <el-popconfirm title="确认删除该菜单吗？" @confirm="handleDeleteMenu(data.row)" confirm-button-text="确认"
                        cancel-button-text="取消" confirm-button-type="danger" icon-color="red">
                        <template #reference>
                            <span class="danger">删除</span>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <MenuForm @success="getTableData" :parent="parentMenu" :editData="editData" :isEdit="isEdit"
            v-model:show="showMenuForm"></MenuForm>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue"
import { getMenuList, deleteMenu } from "@/api/menu"
import { Permi } from "@/types/permi";
import MenuForm from "./component/form.vue"
import { ElNotification } from "element-plus";
const MenuType: { [x: string]: string } = {
    "1": "目录",
    "2": "菜单",
    "3": "按钮"
}
const queryConfig = reactive({
    menuName: "",
})
let showMenuForm = ref(false)
let tableData = ref<Permi[]>([])
const isEdit = ref(false)
const editData = ref<Permi>()
const parentMenu = ref()

getTableData()

async function getTableData() {
    const { data } = await getMenuList(queryConfig)
    tableData.value = data
}

function search() {
    getTableData()
}

function editMenu(permi: any) {
    editData.value = permi as Permi
    isEdit.value = true
    showMenuForm.value = true
}

function addMenu() {
    isEdit.value = false
    showMenuForm.value = true
}

function addMenuByMenu(data: any) {
    isEdit.value = false
    showMenuForm.value = true
    parentMenu.value = {
        parentName: data.menuName,
        parentID: data._id
    }
}

async function handleDeleteMenu(data: any) {
    const { code } = await deleteMenu({ menuID: data._id })
    if (code === 200) {
        ElNotification({
            title: "提示",
            message: "菜单删除成功",
            type: "success"
        })
        getTableData()
    }
}
</script>

<style scoped lang="scss">
@import "@/style/form.scss";

:deep(.cell) {
    display: flex !important;
    align-items: center;
}
</style>