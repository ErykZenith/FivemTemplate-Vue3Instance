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
