<template>
    <header class="m-header">
        <a :href="homepage"
            ><img class="u-logo" svg-inline src="../assets/img/logo.svg"
        /></a>
        <el-divider class="u-title">JX3BOX</el-divider>
    </header>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");
    export default {
        name : 'CardHeader',
        data : function(){
            return {
                homepage : JX3BOX.__Root
            }
        },
    }
</script>