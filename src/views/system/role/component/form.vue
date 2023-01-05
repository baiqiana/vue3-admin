<template>
    <el-dialog v-model="show" :close-on-click-modal="false" width="600px" :title="isEdit ? '编辑角色' : '添加角色'">
        <el-form ref="form" :model="formModel" :rules="formRule">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="formModel.roleName" placeholder="请输入" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item>
                <div class="form-btns">
                    <el-button @click="show = false">取消</el-button>
                    <el-button @click="submit" type="primary">确定</el-button>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue"
import { FormRules, ElForm, ElNotification } from "element-plus"
import { addRole, editRole } from "@/api/role"
import { role } from "@/types/role";

const props = defineProps<{
    show: boolean,
    isEdit: boolean,
    editData: Partial<role>
}>()

const emits = defineEmits(["update:show", "success"])

const form = ref<InstanceType<typeof ElForm> | null>(null)

const formModel = reactive({
    roleName: ""
})

const formRule = ref<FormRules>({
    roleName: [
        { required: true, message: "请输入角色名称", trigger: "blur" }
    ]
})

function submit() {
    form.value?.validate(async valid => {
        if (valid) {
            try {
                if (props.isEdit) {
                    // editRole
                    submitEditRole()
                } else {
                    submitAddRole()
                }
            } catch (error) {
                console.log("role add error: ", error)
            }
        }
    })
}

async function submitAddRole() {
    await addRole(formModel)
    show.value = false
    ElNotification({
        title: "成功",
        type: "success",
        message: "角色添加成功"
    })
    emits("success")
}

async function submitEditRole() {
    let postConfig = {
        roleName: formModel.roleName,
        roleID: props.editData._id!
    }
    await editRole(postConfig)
    show.value = false
    ElNotification({
        title: "成功",
        type: "success",
        message: "角色编辑成功"
    })
    emits("success")
}

const show = computed({
    get: () => {
        if (props.isEdit) {
            formModel.roleName = props.editData.roleName!
        }
        return props.show
    },
    set: (v) => {
        emits("update:show", v)
        if (!v) {
            formModel.roleName = ""
        }
    }
})

</script>

<style scoped lang="scss">
@import url("@/style/dialogForm.scss");
</style>