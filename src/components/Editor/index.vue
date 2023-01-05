
<template>
    <div class="article-form">
        <el-form :model="formModel">
            <el-form-item label="文章标题：">
                <el-input v-model="formModel.title" placeholder="请输入文章标题"></el-input>
            </el-form-item>
            <el-form-item label="文章描述：">
                <el-input v-model="formModel.description" placeholder="请输入文章描述"></el-input>
            </el-form-item>
            <el-form-item label="分类：">
                <el-select multiple v-model="formModel.tagList" placeholder="请选择文章分类">
                    <el-option value="">无</el-option>
                    <el-option v-for="item in categoryList" :value="item._id" :label="item.categoryName"></el-option>
                </el-select>
            </el-form-item>
            <div class="a-publish">
                <el-button v-if="formModel.status === 1" @click="publishArticle" size="large"
                    type="primary">发布</el-button>
            </div>
        </el-form>
    </div>
    <div @drop="getDragFile">
        <!-- <mavon-editor v-model="articleBody" fontSize="16px" :subfield="false" :ishljs="true" :toolbarsFlag="false"
            defaultOpen="preview"></mavon-editor> -->
        <md-editor ref="Editor" @on-save="contentSave" v-model="articleBody" @on-upload-img="uploadImg" />
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { getPolicy } from "@/api/policy"
import request from "@/util/request"
import type { ExposeParam } from "md-editor-v3"
import { getCategoryList } from "@/api/category"
import { createArticle, getArticleById } from "@/api/article"
import { ElNotification, Tag } from 'element-plus';

const props = defineProps<{ articleID: string | undefined }>()

const articleBody = ref('');
const policy = ref(await getUploadPolicy())
const Editor = ref<ExposeParam>()
const formModel = reactive<{ title: string, description: string, tagList: string[], status: number }>({
    title: "",
    description: "",
    tagList: [],
    status: 1
})
const categoryList = ref()
let articleID: string | undefined = ""

await getArticleCategory()


async function uploadImg(e: File[]) {
    let files = await Promise.all(e.map(async file => {
        const formData = new FormData();
        let fileName = `${policy.value.key}${file.name}`
        formData.append("OSSAccessKeyId", policy.value.OSSAccessKeyId)
        formData.append("policy", policy.value.policy)
        formData.append("success_action_status", "200");
        formData.append("signature", policy.value.signature);
        formData.append("key", fileName);
        formData.append("file", file);

        await request({
            url: policy.value.host,
            method: "POST",
            headers: {
                "Content-type": "multipart/formData"
            },
            data: formData
        })
        return policy.value.host + "/" + fileName
    }))
    files.forEach(path => {
        Editor.value?.insert((selectedText) => {
            return {
                targetValue: `
![](${path})
`,
                select: true,
                deviationStart: 0,
                deviationEnd: 0
            }
        })
    })
}

async function getUploadPolicy() {
    let data = await getPolicy()
    return data
}

function getDragFile(e: DragEvent) {
    e.preventDefault()
    uploadImg(Array.from(e.dataTransfer!.files) as unknown as File[])
}

async function contentSave() {
    let postConfig = { body: articleBody.value, ...formModel, articleID: articleID }
    const { code, data } = await createArticle(postConfig)
    if (code === 200) {
        articleID = data?._id
        ElNotification({
            title: "提示",
            message: "文章已保存",
            type: "success"
        })
    }
}

async function getArticleCategory() {
    const { data } = await getCategoryList({ pageSize: 999, pageNum: 1 })
    categoryList.value = data.list
}

function publishArticle() {
    formModel.status = 2
    contentSave()
}

watch(() => props.articleID, async (v) => {
    if (v && v !== ":articleID") {
        let { data } = await getArticleById(v)
        articleID = v;
        formModel.tagList = data!.tagList.map(t => t._id)
        formModel.title = data!.title
        formModel.description = data!.description
        formModel.status = data!.status
        articleBody.value = data!.body
    }
}, { immediate: true })

</script>

<style scoped lang="scss">
#md-editor-v3 {
    height: calc(100vh - 240px);
}

:deep(.el-form) {
    padding: 24px;
    display: flex;
    align-items: center;

    .el-input {
        width: 400px;
    }

    .el-form-item__label {
        margin-left: 20px;
    }
}

.article-form {
    position: relative;
}

.a-publish {
    position: absolute;
    top: 24px;
    right: 24px;
}
</style>