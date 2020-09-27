import axios from "axios";
const $ = axios.create({
    withCredentials : true
});

import Vue from "vue";
import { Message, Notification } from "element-ui";
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
const broadcast = new Vue()

function installInterceptors(target){
    target['interceptors']['response'].use(
        function(response) {
            return response;
        },
        function(err) {
            // if (err.response && err.response.data) {
            //     broadcast.$message.error(`${err.response.data.msg}`);
            // } else {
            //     broadcast.$message.error("网络请求异常");
            // }
            console.log(err)
            return Promise.reject(err);
        }
    );
}
installInterceptors(axios)
installInterceptors($)

export { $, axios };
