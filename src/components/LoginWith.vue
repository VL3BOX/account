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
            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
        </el-row>
    </div>
</template>

<script>
const { OAuth } = require("@jx3box/jx3box-common");
const API = 'http://localhost:5120/oauth/github/callback'
export default {
    name: "LoginWith",
    props: [],
    data: function() {
        return {
            github: OAuth.github
        };
    },
    computed: {
        github_url: function() {
            // FIXME:return `${this.github.authorize_uri}?client_id=${this.github.client_id}&redirect_uri=${this.github.redirect_uri}`;
            return `${this.github.authorize_uri}?client_id=${this.github.client_id}&redirect_uri=${API}`;
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
