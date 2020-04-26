<template>
    <div class="m-card" id="app">
        <el-card class="box-card">
            <CardHeader />

            <main v-if="success == true" class="m-main">
                <el-alert
                    title="登录成功"
                    type="success"
                    description="欢迎回来(#^.^#)"
                    show-icon
                    :closable="false"
                >
                </el-alert>
                <a
                    class="u-skip el-button u-button el-button--primary"
                    :href="redirect"
                    >即将跳转</a
                >
            </main>

            <main v-if="success == false" class="m-main">
                <el-alert
                    title="登录失败"
                    type="error"
                    description="令牌不合法或已过期"
                    show-icon
                    :closable="false"
                >
                </el-alert>
                <a
                    class="u-skip el-button u-button el-button--primary"
                    href="../login"
                    >返回登录</a
                >
            </main>
        </el-card>
        <Bottom />
    </div>
</template>

<script>
import CardHeader from "@/components/CardHeader.vue";
const axios = require("axios");
const { JX3BOX,User } = require("@jx3box/jx3box-common");
const API = JX3BOX.__server;
// const API = 'http://localhost:5120/'

export default {
    name: "Login_Callback",
    data: function() {
        return {
            success: null,
            redirect : JX3BOX.__Root,
        };
    },
    methods: {
    },
    filters: {},
    mounted: function() {
        if(document.location.search){
            let params = new URLSearchParams(document.location.search);
            let data = {}
            for(let pair of params.entries()){
                data[pair[0]] = pair[1]
            }
            console.log(data)
            User.update(data).then(() => {
                this.success = true
                location.href = decodeURIComponent(this.redirect)
            })
        }else{
            this.success = false
        }
    },
    components: {
        CardHeader,
    },
};
</script>

<style lang="less">
@import "../../assets/css/common.less";
@import "../../assets/css/card.less";
@import "../../assets/css/register.less";
</style>
