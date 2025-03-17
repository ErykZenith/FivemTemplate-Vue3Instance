export const post = (endpoint, requestData) => {
    let fakeResponse = null;
    let requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
    };

    return {
        fakeResp(fakeData) {
            fakeResponse = fakeData;
            return this;
        },
        options(options) {
            requestOptions = options;
            return this;
        },
        execute(isExternal = false) {
            return new Promise(async (resolve, reject) => {
                if (!isExternal && ENV.devMode) return resolve(fakeResponse);
                let url = isExternal ? endpoint : `https://${window.GetParentResourceName()}/${endpoint}`;
                try {
                    const response = await fetch(url, requestOptions);
                    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                    const responseData = await response.json();
                    resolve(responseData);
                } catch (error) {
                    console.error("Request failed:", error);
                    reject(error);
                }
            });
        }
    };
};

export const createEventHandler = (expectedEvent, eventHandlers) => {
    const onMessageReceived = ({ data }) => {
        if (expectedEvent !== data[0]) return;
        const handler = eventHandlers[data[1]];
        if (handler) {
            handler(...data.slice(2));
        } else {
            console.warn(`ไม่พบ handler สำหรับอีเวนต์: ${data[0]} กับวิธีการ: ${data[1]}`);
        }
    };
    window.addEventListener("message", onMessageReceived);
    return {
        remove() {
            window.removeEventListener("message", onMessageReceived);
        },
    };
};

export const emit = (expectedEvent, ...args) => {
    window.postMessage([expectedEvent, ...args], "*");
}

export const emitDebug = (expectedEvent, ...args) => {
    if (!ENV.devMode) return;
    window.postMessage([expectedEvent, ...args], "*");
}