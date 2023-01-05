<template>
    <div class="login" v-loading="loading">
        <div class="l-banner">
            <h1 class="l-b-title">白千后台</h1>
        </div>
        <div class="l-main">
            <div class="l-form-content">
                <div class="l-f-title">您好，<br />欢迎登录白千后台</div>
                <el-form ref="form" :rules="rules" :model="login" class="l-form" @submit.prevent="handleLogin">
                    <el-form-item label="账号：" prop="username">
                        <el-input v-model="login.username" placeholder="请输入账号">
                            <template #prefix>
                                <span class="iconfont icon-user"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="password">
                        <el-input v-model="login.password" type="password" placeholder="请输入密码">
                            <template #prefix>
                                <span class="iconfont icon-signin_password"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="code" label="验证码">
                        <el-input placeholder="请输入验证码" v-model="login.code"></el-input>
                    </el-form-item>
                    <div class="l-code">
                        <Code ref="codeRef"></Code>
                    </div>
                    <el-form-item>
                        <el-button native-type="submit" class="l-f-btn" type="primary">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

import Code from "@/components/Code/index.vue"
import type { IElForm, IElFormRules } from "@/types/element-plus"
import type { ILoginInfo } from "@/types/login"
import { login as loginApi } from "@/api/login"
import { setItem } from "@/util/storage"
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';
import md5 from "blueimp-md5"

const codeRef = ref<InstanceType<typeof Code> | null>(null)
const form = ref<IElForm | null>(null)
const loading = ref<boolean>(false)
const router = useRouter()

const rules = ref<IElFormRules>({
    username: [
        { required: true, message: "请输入账号", trigger: "blur" },
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" }
    ],
    code: [{
        required: true, message: "请输入验证码", trigger: "blur"
    }],

})



const login = reactive<ILoginInfo>({
    username: "",
    password: "",
    code: ""
})

const handleLogin = function () {
    form.value?.validate(async (valid) => {
        if (valid) {
            if (codeRef.value && codeRef.value.validate(login.code)) {
                loading.value = true
                try {
                    console.log("md5(login.password)", md5(login.password))
                    const { data } = await loginApi({
                        username: login.username,
                        password: md5(login.password)
                    })

                    ElNotification({
                        title: '成功',
                        message: '登录成功',
                        type: 'success',
                    })
                    setItem("token", data.token)
                    router.push("/")
                } catch (error) {
                    loading.value = false
                }
            } else if (codeRef.value) {
                ElNotification({
                    title: '错误',
                    message: '请重新输入验证码',
                    type: 'error',
                })
                codeRef.value.refresh()
                login.code = ""
            }
        } else {
            alert("校验失败")
        }
    })
}


</script>

<style scoped lang="scss">
.l-banner {
    background-color: #262f40;
    width: 100vw;
    height: 100px;
    overflow: hidden;
}

.l-main {
    width: 100vw;
    height: calc(100vh - 100px);
    background-color: rgb(215, 236, 243);
    overflow: hidden;
}


.l-b-title {
    color: #fff;
    margin-left: 100px;
}

.l-f-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
}

.l-form-content {
    margin: 100px auto 0;
    width: 380px;
    background-color: #fff;
    border-radius: 12px;
    padding: 24px;
}

.l-f-btn {
    width: 100%;
    margin: 20px auto 0;
}

.l-code {
    display: flex;
    justify-content: flex-end;
}
</style>
<!-- random是0到1 -->
<!-- 假如到20， 那么就加20 -->
<!-- 如果最小是2，min + 2  -->