<template>
    <div class="m-card" id="app">
        <el-card class="box-card">
            <CardHeader />

            <main class="m-main">

                <el-alert v-if="success == null" 
                    title="未知异常"
                    type="error"
                    description="非法请求或网络异常"
                    show-icon
                    :closable="false"
                >
                </el-alert>

                <el-alert v-if="success == true" 
                    title="验证成功"
                    type="success"
                    description="欢迎成为JX3BOX大家庭的正式一员:)"
                    show-icon
                    :closable="false"
                >
                </el-alert>

                <el-alert v-if="success == false" 
                    title="验证失败"
                    type="warning"
                    description="无效链接 或 链接已失效"
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

        </el-card>
        <Bottom />
    </div>
</template>

<script>
import CardHeader from "@/components/CardHeader.vue";
const axios = require("axios");
const { JX3BOX } = require("@jx3box/jx3box-common");
const API = JX3BOX.__server
// const API = 'http://localhost:5120/'

export default {
    name: "Register",
    data: function() {
        return {
            success: null,
            uid: "",
            code: "",
            homepage: JX3BOX.__Root,
        };
    },
    computed: {
        ready: function() {
            return this.uid && this.code.length == 24;
        },
    },
    methods: {
        parse: function() {
            let search = new URLSearchParams(document.location.search);
            this.uid = search.get('uid')
            this.code = search.get('code')
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
                        location.href = this.homepage;
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
    },
    filters: {},
    mounted: function() {
        // 解析请求字符串
        this.parse();

        // 不合法字符串
        if (!this.ready) {
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
