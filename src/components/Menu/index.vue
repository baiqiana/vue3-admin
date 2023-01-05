<template>
    <el-drawer v-model="innerShow" direction="rtl" size="800px">
        <template #header>
            <h4>{{ props.role.roleName }}-权限管理</h4>
        </template>
        <template #default>
            <el-tree ref="menuTree" :data="menu.list" show-checkbox node-key="_id" :props="menuProps"
                :default-checked-keys="menu.chooseIDs"></el-tree>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="innerShow = false">取消</el-button>
                <el-button @click="submit" type="primary">确认</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { computed, reactive, watch, ref } from "vue"
import { role as Role } from "@/types/role";
import { Permi } from "@/types/permi"
import { getMenuList, getRoleMenu, editRoleMenu } from "@/api/menu"
import { ElNotification, ElTree } from "element-plus"
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    role: {
        type: Object as () => Partial<Role>,
        required: true,
    }
})
const emits = defineEmits(["update:show"])
const menuTree = ref<InstanceType<typeof ElTree>>()
const menu = reactive<{ list: Permi[], chooseIDs: string[] }>({
    list: [],
    chooseIDs: []
})
const menuProps = {
    label: "menuName",
    children: "children"
}

const innerShow = computed({
    get: () => {
        return props.show
    },
    set: (v) => {
        emits("update:show", v)
    }
})

watch(() => props.show, async (v) => {
    if (v) {
        const res = await Promise.all([getMenuList(), getRoleMenu({ roleID: props.role._id! })])
        menu.list = res[0].data
        menuTree.value?.setCheckedKeys(res[1].data)
        menu.chooseIDs = res[1].data
    }
})

async function submit() {
    let allKeys = menuTree.value!.getCheckedKeys()
    let halfKeys = menuTree.value!.getHalfCheckedKeys()
    let totalKeys = allKeys.concat(halfKeys)
    const res = await editRoleMenu({ menuIDs: totalKeys as string[], roleID: props.role._id! })
    if (res.code === 200) {
        innerShow.value = false
        ElNotification({
            title: "提示",
            type: "success",
            message: "角色权限更改成功"
        })
    }
}

</script>

<style scoped>

</style>