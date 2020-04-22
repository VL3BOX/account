<template>
    <div class="m-oauth">
        <el-divider class="u-title">OR</el-divider>
        <el-row :gutter="20">
            <el-col :span="8"
                ><a :href="github_url">
                    <i class="u-oauth-logo"
                        ><img svg-inline src="../assets/img/github.svg"
                    /></i>
                    <span class="u-oauth-name">Github</span>
                </a></el-col
            >
            <el-col :span="8"><a :href="qq_url">
                    <i class="u-oauth-logo"
                        ><img svg-inline src="../assets/img/qq.svg"
                    /></i>
                    <span class="u-oauth-name">QQ</span>
                </a></el-col>
            <el-col :span="8"></el-col>
        </el-row>
    </div>
</template>

<script>
const { OAuth,JX3BOX,User } = require("@jx3box/jx3box-common");

// const API = `${JX3BOX.__server}oauth/`
const github_callback = 'http://localhost:5120/oauth/github/callback'
const qq_callback = 'https://www.jx3box.com/wp-json/qqworld-passport/v1/module/qq'

export default {
    name: "LoginWith",
    props: [],
    data: function() {
        return {
            github: OAuth.github,
            qq: OAuth.qq,
            uuid : User.getUUID() || 'jx3box'
        };
    },
    computed: {
        github_url: function() {
            return `${this.github.authorize_uri}?client_id=${this.github.client_id}&redirect_uri=${github_callback}`;
        },
        qq_url: function() {
            return `${this.qq.authorize_uri}?client_id=${this.qq.client_id}&redirect_uri=${qq_callback}&response_type=code&scope=get_user_info&state=${this.uuid}`;
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
