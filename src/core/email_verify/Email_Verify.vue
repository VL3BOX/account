<template>
    <div class="m-card" id="app">
        <el-card class="box-card">
            <CardHeader />

            <main v-if="success == null" class="m-main">
                <el-alert
                    title="未知异常"
                    type="error"
                    description="非法请求或网络异常"
                    show-icon
                    :closable="false"
                >
                </el-alert>
                <a
                    class="u-skip el-button u-button el-button--primary"
                    :href="homepage"
                    >返回首页</a
                >
            </main>

            <main v-if="success == true" class="m-main">
                <el-alert
                    title="验证成功"
                    type="success"
                    description="欢迎成为JX3BOX大家庭的正式一员:)"
                    show-icon
                    :closable="false"
                >
                </el-alert>
                <a
                    class="u-skip el-button u-button el-button--primary"
                    :href="homepage"
                    >返回</a
                >
            </main>

            <main v-if="success == false" class="m-main">
                <template v-if="done == true">
                    <el-alert
                        title="发送成功"
                        type="success"
                        description="新的验证邮件已发送,请注意查收"
                        show-icon
                        :closable="false"
                    >
                    </el-alert>
                    <a
                        class="u-skip el-button u-button el-button--primary"
                        :href="homepage"
                        >返回首页</a
                    >
                </template>

                <template v-else>
                    <el-alert
                        title="验证失败"
                        type="warning"
                        description="无效链接 或 链接已失效"
                        show-icon
                        :closable="false"
                    >
                    </el-alert>
                    <el-button class="u-button" type="primary" @click="resend"
                        >重新发送验证邮件</el-button
                    >
                </template>
            </main>
        </el-card>
        <Bottom />
    </div>
</template>

<script>
import CardHeader from "@/components/CardHeader.vue";
const axios = require("axios");
const { JX3BOX } = require("@jx3box/jx3box-common");
// const API = JX3BOX.__api
const API = "http://localhost:5120/"; //FIXME:for test

export default {
    name: "Register",
    data: function() {
        return {
            success: '',
            uid: "",
            code: "",
            done: false,
            token: "", //TODO:携带token

            homepage: JX3BOX.__Root,
        };
    },
    computed: {
        check: function() {
            return this.uid && this.code.length == 24;
        },
    },
    methods: {
        parse: function() {
            let query = new URLSearchParams(document.location.search);
            this.uid = query.get("uid");
            this.code = query.get("code");
        },
        verify: function() {
            axios
                .get(API + "account/email/verify", {
                    params: {
                        uid: this.uid,
                        code: this.code,
                    },
                })
                .then((res) => {
                    this.success = true;
                    // 跳转至首页
                    setTimeout(function() {
                        location.href = homepage;
                    }, 2000);
                })
                .catch((err) => {
                    if (err.response) {
                        this.success = false;
                    } else {
                        this.success = null;
                    }
                });
        },
        resend: function() {
            axios
                .post(API + "account/email/resend", {
                    data: {
                        uid: this.uid,
                    },
                    auth: {
                        username: this.token,
                        password: "resendEmail",
                    },
                })
                .then((res) => {
                    this.done = true;
                })
                .catch((err) => {
                    this.done = false;
                    this.success = null;
                });
        },
    },
    filters: {},
    mounted: function() {
        // 解析请求字符串
        this.parse();

        // 不合法字符串
        if (!this.check) {
            this.success = null;
            return;
        }

        // 验证
        this.verify();
    },
    components: {
        CardHeader,
    },
};
</script>

<style lang="less">
@import "../../assets/css/common.less";
@import "../../assets/css/card.less";
</style>
