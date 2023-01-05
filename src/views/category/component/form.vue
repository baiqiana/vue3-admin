<template>
    <el-dialog v-model="show" :close-on-click-modal="false" width="600px" :title="isEdit ? '编辑分类' : '添加分类'">
        <el-form ref="form" :model="formModel" :rules="formRule">
            <el-form-item label="分类名称" prop="categoryName">
                <el-input v-model="formModel.categoryName" placeholder="请输入" maxlength="11"></el-input>
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
import { addCategory, editCategory } from "@/api/category"
// import { category } from "@/types/category";

const props = defineProps<{
    show: boolean,
    isEdit: boolean,
    editData: any
}>()

const emits = defineEmits(["update:show", "success"])

const form = ref<InstanceType<typeof ElForm> | null>(null)

const formModel = reactive({
    categoryName: ""
})

const formRule = ref<FormRules>({
    categoryName: [
        { required: true, message: "请输入分类名称", trigger: "blur" }
    ]
})

function submit() {
    form.value?.validate(async valid => {
        if (valid) {
            try {
                if (props.isEdit) {
                    // editCategory
                    submitEditCategory()
                } else {
                    submitAddCategory()
                }
            } catch (error) {
                console.log("category add error: ", error)
            }
        }
    })
}

async function submitAddCategory() {
    await addCategory(formModel)
    show.value = false
    ElNotification({
        title: "成功",
        type: "success",
        message: "分类添加成功"
    })
    emits("success")
}

async function submitEditCategory() {
    let postConfig = {
        categoryName: formModel.categoryName,
        categoryID: props.editData._id!
    }
    await editCategory(postConfig)
    show.value = false
    ElNotification({
        title: "成功",
        type: "success",
        message: "分类编辑成功"
    })
    emits("success")
}

const show = computed({
    get: () => {
        if (props.isEdit) {
            formModel.categoryName = props.editData.categoryName!
        }
        return props.show
    },
    set: (v) => {
        emits("update:show", v)
        if (!v) {
            formModel.categoryName = ""
        }
    }
})

</script>

<style scoped lang="scss">
@import url("@/style/dialogForm.scss");
</style>