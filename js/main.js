const app = Vue.createApp({
    data() {
        return {
           msg:"Vue3"
        };
    },
    methods: {
        onListener({ data: {
            action,
            data
        }}) {
            switch (action) {
                case "open":
                    console.log(data);
                    break;
                default:
                    break;
            }
        },
    },
    async mounted() {
        const res = await post("setup")
        console.log("setup : ",res);
        window.addEventListener("message", this.onListener)
    },
    onUnmounted() {
        window.removeEventListener(this.onListener)
    }
});

app.mount('#app');
