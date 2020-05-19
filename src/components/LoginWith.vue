<template>
    <div class="m-oauth">
        <el-divider class="u-title">OR</el-divider>
        <el-row :gutter="20">
            <el-col :span="8"
                ><a class="u-item" :href="github_url">
                    <i class="u-oauth-logo"
                        ><img svg-inline src="../assets/img/github.svg"
                    /></i>
                    <span class="u-oauth-name">Github</span>
                </a></el-col
            >
            <el-col :span="8"
                ><a class="u-item" :href="qq_url">
                    <i class="u-oauth-logo"
                        ><img svg-inline src="../assets/img/qq.svg"
                    /></i>
                    <span class="u-oauth-name">QQ</span>
                </a></el-col
            >
            <el-col :span="8"
                ><a class="u-item" :href="weibo_url">
                    <i class="u-oauth-logo"
                        ><img svg-inline src="../assets/img/weibo.svg"
                    /></i>
                    <span class="u-oauth-name">微博</span>
                </a></el-col
            >
        </el-row>

        <!-- <div class="u-ac">
            原使用QQ登录的用户,在2020/4/28日之后没有使用<a href="https://www.jx3box.com/login" target="_blank">旧登录系统</a>登录过的，请先通过<a href="https://www.jx3box.com/login" target="_blank">旧登录系统</a>进行激活
        </div> -->
    </div>
</template>

<script>
const { OAuth, JX3BOX, User } = require("@jx3box/jx3box-common");

export default {
    name: "LoginWith",
    props: [],
    data: function() {
        return {
            github: OAuth.github,
            qq: OAuth.qq,
            weibo: OAuth.weibo,
            uuid: User.getUUID() || "jx3box",
        };
    },
    computed: {
        github_url: function() {
            return `${this.github.authorize_uri}?client_id=${this.github.client_id}&redirect_uri=${this.github.callback}`;
        },
        qq_url: function() {
            return `${this.qq.authorize_uri}?client_id=${this.qq.client_id}&redirect_uri=${this.qq.callback}&response_type=code&scope=get_user_info&state=${this.uuid}`;
        },
        weibo_url: function() {
            return `${this.weibo.authorize_uri}?client_id=${this.weibo.client_id}&response_type=code&redirect_uri=${this.weibo.callback}`;
        },
    },
    methods: {},
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/oauth.less";
</style>
