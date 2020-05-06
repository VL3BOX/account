Vue.config.productionTip = false;

// import Vue from "vue";
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// Vue.use(ElementUI);

import Bottom from "@jx3box/jx3box-common-ui/src/Bottom.vue"
Vue.component('Bottom',Bottom)

// import router from "../router";
// import store from "../store";

import Email_Verify from "./Email_Verify.vue";

new Vue({
    // router,
    // store,
    render: (h) => h(Email_Verify),
}).$mount("#app");
