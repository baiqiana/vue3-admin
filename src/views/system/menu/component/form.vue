<template>
    <div>
        <el-drawer :title="isEdit ? '编辑菜单' : '添加菜单'" v-model="innerShow" direction="rtl" size="800px">
            <el-form ref="form" :model="formData" :rules="formRules">
                <el-form-item label="上级菜单：" prop="parentID">
                    <el-select ref="select" placeholder="请选择" @clear="formData.parentID = ''"
                        v-model="formData.parentName" clearable>
                        <div class="selectDown">
                            <el-option value="">
                                <el-tree ref="menuTree" :data="menu.list" node-key="_id" :props="treeProps"
                                    @node-click="chooseParent"></el-tree>
                            </el-option>
                        </div>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单类型：" prop="menuType">
                    <el-radio-group v-model="formData.menuType">
                        <el-radio :label="1">目录</el-radio>
                        <el-radio :label="2">菜单</el-radio>
                        <el-radio :label="3">按钮</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="菜单名称：" prop="menuName">
                    <el-input v-model="formData.menuName" placeholder="输入菜单名称"></el-input>
                </el-form-item>
                <el-form-item v-if="formData.menuType !== 3" label="菜单图标：" prop="icon">
                    <el-input v-model="formData.icon" placeholder="输入iconfont类型，如icon-home, 输入home"></el-input>
                </el-form-item>
                <el-form-item label="显示排序：" prop="orderNum">
                    <el-input v-model="formData.orderNum" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item v-if="formData.menuType !== 3" label="是否外链" prop="isFrame">
                    <el-radio-group v-model="formData.isFrame">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="formData.menuType === 2" label="路由地址：" prop="path">
                    <el-input v-model="formData.path" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item v-if="formData.menuType === 2" label="组件路径：" prop="path">
                    <el-input v-model="formData.component" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="权限标识" prop="permi">
                    <el-input v-model="formData.permi" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item v-if="formData.menuType !== 3" label="显示状态：" prop="visible">
                    <el-radio-group v-model="formData.visible">
                        <el-radio :label="true">显示</el-radio>
                        <el-radio :label="false">隐藏</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="formData.menuType !== 3" label="菜单状态：" prop="visible">
                    <el-radio-group v-model="formData.status">
                        <el-radio :label="true">正常</el-radio>
                        <el-radio :label="false">停用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <div>
                    <el-button @click="innerShow = false">取消</el-button>
                    <el-button @click="submit" type="primary">确认</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch, ref, h } from "vue"
import { getMenuList, createMenu, editMenuApi } from "@/api/menu"
import { Permi } from "@/types/permi";
import { FormRules, ElForm, ElNotification, ElSelect } from "element-plus"

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    editData: {
        type: Object as () => Permi,
        default: () => { }
    },
    isEdit: {
        type: Boolean,
        default: false
    },
    parent: {
        type: Object,
        default: () => { }
    }
})
const treeProps = {
    label: "menuName",
    children: "children"
}

type treePermi = { label?: string } & Permi

const emits = defineEmits(["update:show", "success"])

const menu = reactive<{ list: treePermi[] }>({
    list: []
})

let formData = initFormData()

function initFormData() {
    return reactive({
        parentID: "",
        parentName: "",
        menuType: 1,
        icon: "",
        menuName: "",
        orderNum: 1,
        isFrame: false,
        path: "",
        visible: true,
        status: true,
        component: "",
        permi: ""
    })
}

const formRules = ref<FormRules>({
    menuName: [{ required: true, message: "角色名称不能为空", trigger: "blur" }]
})

const form = ref<InstanceType<typeof ElForm> | null>(null)
const select = ref<InstanceType<typeof ElSelect> | null>(null)

const innerShow = computed({
    get: () => {
        if (props.show && props.isEdit) {
            formData = Object.assign(formData, props.editData)
        }
        return props.show
    },
    set: (v) => {
        if (!v) {
            formData = initFormData()
        }
        emits("update:show", v)
    }
})



getTableData()

async function getTableData() {
    const { data } = await getMenuList()
    menu.list = data
    menu.list = menu.list.map(d => {
        d.label = d.menuName
        return d
    })
}

function chooseParent(data: Permi) {
    formData.parentName = data.menuName
    formData.parentID = data._id
    select.value!.blur()
}

function submit() {
    form.value?.validate(async (valid) => {
        if (valid) {
            if (props.isEdit) {
                editMenu()
            } else {
                addMenu()
            }

        }
    })
}

async function editMenu() {
    let postConfig = {
        menuID: props.editData._id,
        ...formData
    }

    const { code } = await editMenuApi(postConfig)
    if (code === 200) {
        emits("success")
        ElNotification({
            title: "提示",
            message: "菜单编辑成功",
            type: "success"
        })
        innerShow.value = false
    }
}

async function addMenu() {
    const { code } = await createMenu(formData)
    if (code === 200) {
        emits("success")
        ElNotification({
            title: "提示",
            message: "菜单创建成功",
            type: "success"
        })
        innerShow.value = false
    }
}

watch(() => props.parent, (v) => {
    if (v) {
        formData.parentID = v.parentID
        formData.parentName = v.parentName
    }
})

</script>

<style scoped lang="scss">
.selectDown {
    min-height: 200px;
    overflow-y: auto;

    .el-select-dropdown__item {
        height: 100%;
        padding: 4px 12px;

        &:hover {
            background-color: #fff !important;
        }
    }

    .hover {
        background-color: #fff !important;
    }
}

:deep(.el-form) {
    display: unset !important;


    .el-input {
        width: 300px;
    }


}
</style>