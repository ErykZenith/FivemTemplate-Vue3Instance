import { createApp } from './vue/index.js'
import {
    post,
    onListener,
    unListener,
    emit,
    emitDebug
} from "./eryk/index.js"

createApp({
    data() {
        return {
            msg: "",
            ver: 0,
        };
    },
    methods: {
        version(str) {
            this.ver = str
        },
        message(str) {
            this.msg = str
        },
        unListener(a) {
            unListener(a)
        },
        async onSetup() {
            const res = await post("setup")
                .fakeResp("setup")
                .execute();
            this.msg = res
        }
    },
    mounted() {
        this.onSetup()
        onListener("base", { 
            version: this.version, 
            message: this.message, 
            unListener:this.unListener 
        })
        emit.base.message(this.msg+"vue")
        emit.base.version("3.5.13")
        emitDebug.base.message(" devmode")
    },
    unmounted() {
        unListener()
    }
}).mount("#app");

// Vanilla.JS
// import {
//     post,
//     onListener,
//     unListener,
//     emit,
//     emitDebug
// } from "./eryk/index.js"

// const onSetup = async () => {
//     const res = await post("setup")
//         .fakeResp("setup")
//         .execute();
//     message(res)
// }
// const version = (str) => {
//     document.getElementById("ver").textContent = "v " + str
// }
// const message = (str) => {
//     document.getElementById("msg").textContent = str
// }
// const UnListener = (a) => {
//     unListener(a)
// }

// document.addEventListener("DOMContentLoaded", () => {
//     onSetup()
//     onListener("base", {
//         version: version,
//         message: message,
//         unListener: UnListener
//     })
//     emit.base.message("vue")
//     emit.base.version("3.5.13")
//     setTimeout(() => {
//         emitDebug.base.message(document.getElementById("msg").textContent + " devmode")
//     }, 100);
// });

// window.addEventListener("beforeunload", () => {
//     unListener()
// });
