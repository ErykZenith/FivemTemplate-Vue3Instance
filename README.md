# Code example (lua)

```lua
iframe.createCommand({
	connect = function(...)
		iframe.invoke.message("lua : Where is this place?")
		iframe.invoke.destroyCommand("message")
		return "lua : connect"
	end,
	print = function(...)
		print(...)
		return "lua : hi"
	end,
})
```

# Code example (javascript)

```javascript
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import {
    createCommand,
    destroyCommand,
    command,
    invoke
} from "https://cdn.jsdelivr.net/npm/@erykzenith/fivem-nui-bridge@latest/dist/index.js"

createApp({
    data() {
        return {
            msg: "",
        };
    },
    methods: {
        message(msg) {
            this.msg = this.msg +"<br>"+ msg;
        }
    },
    async mounted() {
        createCommand({
            message: this.message,
            destroyCommand:destroyCommand
        });
        command.message("js : Welcome to js");
        const connect = await invoke.connect();
        console.log(connect.length>0?connect:"connect?");
        command.debug.message("devmode : on");
        command.debug.destroyCommand("message");
        const print = await invoke.print("js : hi");
        console.log(print.length>0?print:"lua?");
    },
    unmounted() {
        destroyCommand();
    }
}).mount("#app");
```
