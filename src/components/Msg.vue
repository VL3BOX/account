<template>
    <div class="m-account-msg" v-html="data" v-if="data"></div>
</template>

<script>
import { getBread } from "@jx3box/jx3box-common/js/helper";
export default {
    data: function() {
        return {
            data: "",
        };
    },
    mounted: function() {
        getBread("account").then((res) => {
            this.data = res.data.data.breadcrumb.html;
        });
    },
};
</script>

<style lang="less">
    @import '../assets/css/msg.less';
</style>