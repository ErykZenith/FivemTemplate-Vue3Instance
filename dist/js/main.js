import { createApp } from './vue/index.js'
import {
    createCommand,
    destroyCommand,
    command,
    invoke
} from "./eryk/index.js"

createApp({
    data() {
        return {
            msg: "",
        };
    },
    methods: {
        message(msg) {
            this.msg = this.msg +"<br>"+ msg
        }
    },
    async mounted() {
        createCommand({
            message: this.message,
            destroyCommand:destroyCommand
        })
        command.message("js : Welcome to js")
        const connect = await invoke.connect();
        console.log(connect.length>0?connect:"connect?");
        command.debug.message("devmode : on")
        command.debug.destroyCommand("message")
        const print = await invoke.print("js : hi");
        console.log(print.length>0?print:"lua?");
    },
    unmounted() {
        destroyCommand()
    }
}).mount("#app");