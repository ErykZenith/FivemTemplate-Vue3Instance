import { createApp } from './vue/index.js'
import {
    post,
    createEventHandler,
    emit,
    emitDebug
} from "./eryk/index.js"

createApp({
    data() {
        return {
            msg: ""
        };
    },
    methods: {
        message(text) {
            this.msg = this.msg + text
            console.log(this.msg)
        },
        async onSetup() {
            const res = await post("setup")
                .fakeResp("i am : ")
                .execute();
            this.msg = this.msg + res
            console.log("setup : ", res);
        }
    },
    mounted() {
        this.onSetup()
        this.CEH = createEventHandler("base", { message: this.message })
        emit("base", "message", "vue");
        emitDebug("base", "message", " v3.5.13");
    },
    unmounted() {
        this.CEH.remove()
    }
}).mount("#app");