<template>
    <div class="m-card" id="app">
        <el-card class="box-card">
            <CardHeader />

            <main v-if="success == null" class="m-main">
                <form>
                    <!-- 账号 -->
                    <div class="u-email">
                        <el-input
                            class="u-text u-email"
                            v-model="email"
                            placeholder="邮箱地址"
                            minlength="3"
                            maxlength="50"
                            type="email"
                            @change="checkEmail"
                        >
                            <template slot="prepend">
                                <img
                                    class="i-mail"
                                    svg-inline
                                    src="../../assets/img/mail.svg"
                                />
                            </template>
                        </el-input>
                        <i
                            v-show="email_available == true"
                            class="el-icon-success u-email-ok"
                        ></i>
                        <div class="u-tip">
                            <el-alert
                                v-show="email_validate == false"
                                :title="email_validate_tip"
                                type="error"
                                show-icon
                                :closable="false"
                            ></el-alert>
                            <el-alert
                                v-show="email_available == false"
                                :title="email_available_tip"
                                type="error"
                                show-icon
                                :closable="false"
                            ></el-alert>
                        </div>
                    </div>

                    <!-- 密码 -->
                    <div class="u-pass">
                        <el-input
                            class="u-text"
                            placeholder="输入密码"
                            v-model="pass"
                            show-password
                            @input="checkPass"
                        >
                            <template slot="prepend">
                                <img
                                    class="i-pass"
                                    svg-inline
                                    src="../../assets/img/pass.svg"
                                />
                            </template>
                        </el-input>
                        <div class="u-tip">
                            <el-alert
                                v-show="pass_validate == false"
                                :title="pass_validate_tip"
                                type="error"
                                show-icon
                                :closable="false"
                            ></el-alert>
                        </div>
                    </div>

                    <!-- 提交 -->
                    <el-button
                        class="u-submit u-button"
                        type="primary"
                        @click="submit"
                        :disabled="!check"
                        >注册</el-button
                    >
                </form>
                <footer class="m-footer">
                    <p class="u-login">
                        已有账号? <a href="../login">登录 &raquo;</a>
                    </p>
                </footer>
            </main>

            <main v-if="success == true" class="m-main">
                <el-alert
                    title="注册成功"
                    type="success"
                    description="一封邮箱验证的邮件已发送至您的邮箱,请注意查收"
                    show-icon
                >
                </el-alert>
                <a
                    class="u-skip el-button u-button el-button--primary"
                    href="../login"
                    >立即登录</a
                >
            </main>

            <main v-if="success == false" class="m-main">
                <el-alert
                    title="注册失败"
                    type="error"
                    description="请求异常,请重试"
                    show-icon
                >
                </el-alert>
                <el-button
                    class="u-button u-submit"
                    type="primary"
                    @click="reset"
                    >返回</el-button
                >
            </main>
        </el-card>
        <Bottom />
    </div>
</template>

<script>
import CardHeader from '@/components/CardHeader.vue';
const { validator } = require("sterilizer");
const axios = require("axios");
const { JX3BOX } = require("@jx3box/jx3box-common");
// const API = JX3BOX.__api
const API = "http://localhost:5120/"; //FIXME:for test

export default {
    name: "Register",
    data: function() {
        return {
            email: "",
            email_validate: null,
            email_validate_tip: "必须为有效的Email,长度限3-50个字符",
            email_available: null,
            email_available_tip: "邮箱地址已被使用",

            pass: "",
            pass_validate: null,
            pass_validate_tip: "密码有效长度为6-50个字符",

            success: null,

            homepage : JX3BOX.__Root
        };
    },
    computed: {
        check: function() {
            return (
                this.email_validate &&
                this.email_available &&
                this.pass_validate
            );
        },
    },
    methods: {
        checkEmail: function() {
            // 如果为空
            if (this.email == "") {
                this.email_validate = null;
                this.email_available = null;
                return;
            }

            // 校验格式
            let result = validator(this.email, {
                isEmail: true,
                len: [3, 50],
            });
            this.email_validate = result;

            // 检查可用性
            if (result) {
                axios
                    .get(API + `account/has?user_login=${this.email}`)
                    .then((res) => {
                        this.email_available = res.data ? false : true;
                    });
            } else {
                this.email_available = null;
            }
        },
        checkPass: function() {
            // 如果为空
            if (this.pass == "") {
                this.pass_validate = null;
                return;
            }

            // 校验格式
            let result = validator(this.pass, {
                len: [6, 50],
            });
            this.pass_validate = result;
        },
        submit: function() {
            if(this.check){
            axios
                .post(API + "account/register/email", {
                    user_login: this.email,
                    user_pass: this.pass,
                })
                .then((res) => {
                    this.success = true
                }).catch((err) => {
                    this.success = false
                })
            }
        },
        reset : function (){
            this.success = null
            this.email_validate = null
            this.email_available = null
            this.pass_validate = null
        }
    },
    filters: {},
    mounted: function() {},
    components: {
        CardHeader
    },
};
</script>

<style lang="less">
@import "../../assets/css/common.less";
@import "../../assets/css/card.less";
@import "../../assets/css/register.less";
</style>
