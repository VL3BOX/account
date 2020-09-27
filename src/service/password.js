import { axios, $ } from "./axios";
import { __server } from "@jx3box/jx3box-common/js/jx3box.json";
function sendCode(email) {
    return axios.post(__server + "account/password/reset/start", {
        email: email,
    });
}

function checkCode(data) {
    return axios.post(__server + "account/password/reset/check", {
        email: data.email,
        code : data.code
    });
}

function resetPassword(data) {
    return axios.post(__server + "account/password/reset/done", {
        email: data.email,
        code : data.code,
        pwd1 : data.pwd1,
        pwd2 : data.pwd2,
    });
}

export { sendCode, checkCode, resetPassword };
