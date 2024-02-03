<template>
    <div class="m-card" id="app">
        <el-card class="box-card">
            <CardHeader />

            <main class="m-main">
                <el-alert
                    v-if="success == null"
                    :title="$t('未知异常')"
                    type="error"
                    :description="$t('非法请求或网络异常')"
                    show-icon
                    :closable="false"
                >
                </el-alert>

                <el-alert
                    v-if="success == true"
                    :title="$t('验证成功')"
                    type="success"
                    :description="$t('欢迎成为JX3BOX大家庭的正式一员:)')"
                    show-icon
                    :closable="false"
                >
                </el-alert>

                <el-alert
                    v-if="success == false"
                    :title="$t('验证失败')"
                    type="warning"
                    :description="$t('无效链接 或 链接已失效')"
                    show-icon
                    :closable="false"
                >
                </el-alert>

                <a
                    class="u-skip el-button u-button el-button--primary"
                    :href="homepage"
                    >{{ $t('返回首页') }}</a
                >
            </main>
        </el-card>
        <Bottom />
    </div>
</template>

<script>
import CardHeader from "@/components/CardHeader.vue";
import { verifyEmail } from "@/service/email.js";
import { __Root } from "@jx3box/jx3box-common/data/jx3box.json";

export default {
    name: "Register",
    data: function() {
        return {
            success: null,
            uid: "",
            code: "",
            homepage: __Root,
        };
    },
    computed: {
        ready: function() {
            return this.uid && this.code;
        },
    },
    methods: {
        parse: function() {
            let search = new URLSearchParams(document.location.search);
            this.uid = search.get("uid");
            this.code = search.get("code");
        },
        verify: function() {
            verifyEmail({
                uid: this.uid,
                code: this.code,
            })
                .then((res) => {
                    if (!res.data.code) {
                        this.success = true;
                        // 跳转至首页
                        setTimeout(() => {
                            location.href = this.homepage;
                        }, 2000);
                    } else {
                        this.success = false;
                    }
                })
                .catch((err) => {
                    this.success = null;
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
