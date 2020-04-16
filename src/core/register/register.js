// import Vue from "vue";
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// Vue.use(ElementUI);
Vue.config.productionTip = false;

// import router from "../router";
// import store from "../store";
import Register from "./Register.vue";

new Vue({
    // router,
    // store,
    render: h => h(Register),
}).$mount("#app");

