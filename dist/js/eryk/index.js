const post = (endpoint, requestData) => {
    let fakeResponse = null;
    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        execute(isExternal = !1) {
            return new Promise(async (resolve, reject) => {
                if (!isExternal && ENV.devMode) return resolve(fakeResponse);
                let url = isExternal ? endpoint : `https://${window.GetParentResourceName()}/${endpoint}`;
                try {
                    const response = await fetch(url, requestOptions);
                    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                    const responseData = await response.json();
                    resolve(responseData);
                } catch (error) {
                    console.error('Request failed:', error);
                    reject(error);
                }
            });
        }
    };
};

const EVENT_HANDLERS = new Map();
let isEventListenerInitialized = !1;

const handleMessageReceived = ({ data }) => {
    try {
        if (!Array.isArray(data) || data.length < 2) {
            console.warn('Received invalid data:', data);
            return;
        }
        const [eventName, eventType, ...args] = data;
        if (!EVENT_HANDLERS.has(eventName)) {
            console.warn(`No handler found for event: ${eventName}`);
            return;
        }
        const eventHandlers = EVENT_HANDLERS.get(eventName);
        const handler = eventHandlers[eventType];
        if (handler && typeof handler === 'function') {
            handler(...args);
        } else {
            console.warn(`No handler found for event: ${eventName}/${eventType}`);
        }
    } catch (error) {
        console.error('Error processing message:', error);
    }
};

const unListener = (eventName) => {
    if (eventName) return EVENT_HANDLERS.delete(eventName)
    if (isEventListenerInitialized) {
        window.removeEventListener('message', handleMessageReceived);
        isEventListenerInitialized = !1;
    }
};

const onListener = (eventName, eventHandlers) => {
    if (typeof eventName !== 'string' || !eventName) {
        throw new Error('eventName must be a non-empty string');
    }
    if (!eventHandlers || typeof eventHandlers !== 'object') {
        throw new Error('eventHandlers must be an object');
    }
    EVENT_HANDLERS.set(eventName, eventHandlers);
    if (!isEventListenerInitialized) {
        window.addEventListener('message', handleMessageReceived);
        isEventListenerInitialized = !0;
    }
    return {
        remove() {
            EVENT_HANDLERS.delete(eventName);
            if (EVENT_HANDLERS.size === 0) {
                unListener();
            }
        }
    };
};

const emit = new Proxy({}, {
    get: (_, key) => new Proxy({}, {
        get: (_, _key) => (...args) => window.postMessage([key, _key, ...args], '*')
    })
});

const emitDebug = new Proxy({}, {
    get: (_, key) => new Proxy({}, {
        get: (_, _key) => (...args) => ENV.devMode && window.postMessage([key, _key, ...args], '*')
    })
});

export {
    post,
    onListener,
    unListener,
    emit,
    emitDebug
}