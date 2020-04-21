<template>
    <div class="m-card" id="app">
        <el-card class="box-card">
            <CardHeader />

            <main v-if="step == 0" class="m-main">
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

            <!-- 1.是否存在可找回 -->
            <main v-if="step == 1" class="m-main">
                <el-alert
                    title="找回密码,请填写绑定的邮箱"
                    type="warning"
                    :closable="false"
                    show-icon
                >
                </el-alert>
                <!-- 邮箱 -->
                <div class="u-email">
                    <el-input
                        class="u-text u-email"
                        v-model="email"
                        placeholder="邮箱地址"
                        minlength="3"
                        maxlength="50"
                        type="email"
                        @input="checkEmail"
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
                        class="el-icon-success u-ok"
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
                    <el-button
                        class="u-button"
                        type="primary"
                        @click="start"
                        :disabled="!available"
                        >下一步</el-button
                    >
                </div>
                <footer class="m-footer">
                    <p class="u-login">
                        已有账号? <a href="../login">登录 &raquo;</a>
                    </p>
                    <p class="u-register">
                        <a href="../register">免费注册</a>
                    </p>
                </footer>
            </main>

            <!-- 2.填写验证码与新密码 -->
            <main v-if="step == 2" class="m-main">
                <el-alert
                    title="请填写邮箱收到的验证码 (10分钟内有效)"
                    type="success"
                    :closable="false"
                >
                </el-alert>

                <!-- 验证码 -->
                <div class="u-code">
                    <el-input
                        class="u-text u-code"
                        v-model="code"
                        placeholder="验证码"
                        minlength="6"
                        maxlength="6"
                        @change="checkCode"
                    >
                        <template slot="prepend">
                            <img
                                class="i-code"
                                svg-inline
                                src="../../assets/img/key.svg"
                            />
                        </template>
                    </el-input>
                    <i
                        v-show="code_available == true"
                        class="el-icon-success u-ok"
                    ></i>
                    <div class="u-tip">
                        <el-alert
                            v-show="code_validate == false"
                            :title="code_validate_tip"
                            type="error"
                            show-icon
                            :closable="false"
                        ></el-alert>
                        <el-alert
                            v-show="code_available == false"
                            :title="code_available_tip"
                            type="error"
                            show-icon
                            :closable="false"
                        ></el-alert>
                    </div>
                </div>

                <!-- 新密码 -->
                <div class="u-pass">
                    <el-input
                        class="u-text"
                        placeholder="输入密码"
                        v-model="pwd1"
                        show-password
                        @change="checkPass"
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

                <!-- 重复密码 -->
                <div class="u-pass">
                    <el-input
                        class="u-text"
                        placeholder="输入密码"
                        v-model="pwd2"
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
                            v-show="pwd2 && accordance == false"
                            :title="pass_accordance_tip"
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
                    @click="done"
                    :disabled="!ready"
                    >提交</el-button
                >
            </main>

            <!-- 3.提交后 -->
            <main v-if="step == 3" class="m-main">
                <!-- 成功 -->
                <template v-if="success == true">
                    <el-alert
                        title="重设成功"
                        type="success"
                        description="您的密码已重设"
                        show-icon
                        :closable="false"
                    >
                    </el-alert>
                    <a
                        class="u-skip el-button u-button el-button--primary"
                        href="../login"
                        >立即登录</a
                    >
                </template>

                <!-- 失败 -->
                <template v-if="success == false">
                    <el-alert
                        title="操作失败"
                        type="error"
                        description="异常请求"
                        show-icon
                        :closable="false"
                    >
                    </el-alert>
                    <el-button
                        class="u-button u-submit"
                        type="primary"
                        @click="reset"
                        >返回</el-button
                    >
                </template>
            </main>
        </el-card>
        <Bottom />
    </div>
</template>

<script>
import CardHeader from "@/components/CardHeader.vue";
const { validator } = require("sterilizer");
const axios = require("axios");
const { JX3BOX } = require("@jx3box/jx3box-common");
// const API = JX3BOX.__api
const API = 'http://localhost:5120'

export default {
    name: "Password_Reset",
    data: function() {
        return {
            step: 1,
            success: false,

            email: "",
            email_validate: null,
            email_validate_tip: "邮箱地址格式不正确",
            email_available: null,
            email_available_tip: "账号不存在",

            code: "",
            code_validate: null,
            code_validate_tip: "验证码格式不正确",
            code_available: null,
            code_available_tip: "验证码无效",

            pwd1: "",
            pwd2: "",
            pass_validate: null,
            pass_validate_tip: "密码有效长度为6-50个字符",
            pass_accordance_tip: "两次密码不一致",

            homepage: JX3BOX.__Root,
        };
    },
    computed: {
        available: function() {
            return this.email_validate && this.email_available;
        },
        accordance: function() {
            return this.pwd1 === this.pwd2;
        },
        ready: function() {
            return (
                this.available &&
                this.code_validate &&
                this.code_available &&
                this.pass_validate &&
                this.accordance
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

            // 检查是否存在
            if (result) {
                axios
                    .get(API + `account/has?user_login=${this.email}`)
                    .then((res) => {
                        this.email_available = res.data ? true : false;
                    });
            } else {
                this.email_available = null;
            }
        },
        checkCode: function() {
            // 如果为空
            if (this.code == "") {
                this.code_validate = null;
                this.code_available = null;
                return;
            }

            // 校验格式
            let result = validator(this.code, {
                isAlphanumeric: true,
                len: 6,
            });
            this.code_validate = result;

            // 检查是否存在
            if (result) {
                axios
                    .post(API + `account/password/reset/check`, {
                        email: this.email,
                        code: this.code,
                    })
                    .then((res) => {
                        this.code_available = true;
                    })
                    .catch((err) => {
                        this.code_available = false;
                    });
            } else {
                this.code_available = null;
            }
        },
        checkPass: function() {
            // 如果为空
            if (this.pwd1 == "") {
                this.pass_validate = null;
            }

            // 校验第1个值
            this.pass_validate = validator(this.pwd1, {
                len: [6, 50],
            });
        },
        start: function() {
            axios
                .get(API + "account/password/reset/start", {
                    params: {
                        email: this.email,
                    },
                })
                .then((res) => {
                    this.step = 2;
                })
                .catch((err) => {
                    this.step = 0;
                });
        },
        done: function() {
            axios
                .post(API + "account/password/reset/done", {
                    email: this.email,
                    code: this.code,
                    pwd1: this.pwd1,
                    pwd2: this.pwd2,
                })
                .then((res) => {
                    this.step = 3;
                    this.success = true;
                })
                .catch((err) => {
                    this.success = false;
                });
        },
        reset: function() {
            this.step = 1;
            this.success = null;
            this.email = "";
            this.email_validate = null;
            this.email_available = null;
            this.code = "";
            this.code_validate = null;
            this.code_available = null;
            this.pwd1 = "";
            this.pwd2 = "";
            this.pass_validate = null;
        },
    },
    filters: {},
    mounted: function() {},
    components: {
        CardHeader,
    },
};
</script>

<style lang="less">
@import "../../assets/css/common.less";
@import "../../assets/css/card.less";
@import "../../assets/css/pwd_reset.less";
</style>
