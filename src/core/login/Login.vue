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
                        <div class="u-tip">
                            <el-alert
                                v-show="email_validate == false"
                                :title="email_validate_tip"
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
                        :disabled="!ready"
                        >登录</el-button
                    >
                </form>
                <footer class="m-footer">
                    <p class="u-login">
                        还没有账号? <a :href="register_url">立即注册 &raquo;</a>
                    </p>
                    <p class="u-resetpwd">
                        <a href="../password_reset">忘记密码?</a>
                    </p>
                </footer>
            </main>

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
                    >{{ redirect_button }}</a
                >
            </main>

            <main v-if="success == false" class="m-main">
                <el-alert
                    title="登录失败"
                    type="error"
                    :description="errors"
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
            </main>
        </el-card>
        <Bottom />
    </div>
</template>

<script>
import CardHeader from "@/components/CardHeader.vue";
const { validator } = require("sterilizer");
const axios = require("axios");
const cookie = require("../../utils/cookie");
import { v4 as uuidv4 } from "uuid";
const { JX3BOX } = require("@jx3box/jx3box-common");
const API = JX3BOX.__api;
// const API = 'http://localhost:5120'

export default {
    name: "Login",
    data: function() {
        return {
            success: null,

            redirect: "",
            redirect_button: "",
            errors: "未知异常",

            email: "",
            email_validate: null,
            email_validate_tip: "用户名有效长度为3-50个字符",

            pass: "",
            pass_validate: null,
            pass_validate_tip: "密码有效长度为6-50个字符",

            homepage: JX3BOX.__Root,

            failcount: 0,
            faillimit: 10,
            device_id: "",
        };
    },
    computed: {
        ready: function() {
            return this.email_validate && this.pass_validate;
        },
        register_url : function (){
            return '../register?redirect=' + this.redirect
        }
    },
    methods: {
        checkEmail: function() {
            // 如果为空
            if (this.email == "") {
                this.email_validate = false;
                return;
            }

            // 校验格式
            let result = validator(this.email, {
                len: [3, 50],
            });
            this.email_validate = result;
        },
        checkPass: function() {
            // 如果为空
            if (this.pass == "") {
                this.pass_validate = false;
                return;
            }

            // 校验格式
            let result = validator(this.pass, {
                len: [6, 50],
            });
            this.pass_validate = result;
        },
        submit: function() {
            if (this.isfrozen()) return;

            if (this.ready) {
                axios
                    .post(
                        API + "account/login/email",
                        {
                            user_login: this.email,
                            user_pass: this.pass,
                            device_id: this.device_id,
                        },
                        {
                            withCredentials: true,
                        }
                    )
                    .then((res) => {
                        this.success = true;

                        let data = res.data.data;
                        
                        localStorage.setItem('created_at',Date.now())
                        localStorage.setItem("logged_in", true);

                        localStorage.setItem('token',data.token)
                        localStorage.setItem("device_id", this.device_id);

                        localStorage.setItem("profile", JSON.stringify({
                            uid: data.uid,
                            group: data.group,
                            name: data.name,
                            avatar: data.avatar,
                            bio: data.bio,
                        }));
                        

                        // 跳转至来源页
                        if (this.redirect) {
                            setTimeout(() => {
                                location.href = this.redirect;
                            }, 1200);
                        }
                    })
                    .catch((err) => {
                        this.success = false;
                        if (err.response) {
                            this.errors = "账号或密码错误";
                            this.failcount++;
                            this.frozen();
                        } else {
                            this.errors = "网络异常或非法请求";
                        }
                    });
            }
        },
        reset: function() {
            this.success = null;
            this.email = "";
            this.email_validate = null;
            this.pass = "";
            this.pass_validate = null;
        },
        frozen: function() {
            if (this.failcount >= this.faillimit) {
                cookie.set("loginIsFrozen", "true", 86400);
            }
        },
        isfrozen: function() {
            if (this.failcount >= this.faillimit) {
                this.success = false;
                this.errors = "失败次数过多,请过24小时后再试";
                return true;
            }
            return false;
        },
        checkDirect: function() {
            let search = new URLSearchParams(document.location.search);
            let redirect = search.get('redirect')
            if (redirect) {
                this.redirect = redirect;
                this.redirect_button = "即将跳转";
            } else {
                this.redirect = this.homepage;
                this.redirect_button = "返回首页";
            }
        },
        checkDeviceID: function() {
            let device_id = localStorage.getItem("device_id");
            if (!device_id) {
                this.device_id = uuidv4();
            } else {
                this.device_id = device_id;
            }
        },
    },
    filters: {},
    mounted: function() {
        this.checkDirect();
        this.checkDeviceID();
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
