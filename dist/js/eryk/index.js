const post = (endpoint, requestData) => {
    let fakeResponse = null, requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
    };

    return {
        fakeResp(fakeData) { fakeResponse = fakeData; return this; },
        options(options) { requestOptions = options; return this; },
        async execute(isExternal = false) {
            if (!isExternal && ENV.devMode) return fakeResponse;
            const url = isExternal ? endpoint : `https://${window.GetParentResourceName()}/${endpoint}`;
            try {
                const response = await fetch(url, requestOptions);
                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                return await response.json();
            } catch (error) {
                console.error('Request failed:', error);
                throw error;
            }
        }
    };
};

const EVENT_HANDLERS = new Map();
let isEventListenerInitialized = false;

const handleMessageReceived = ({ data }) => {
    if (!Array.isArray(data) || data.length < 2) return console.warn('Received invalid data:', data);
    const [eventName, eventType, ...args] = data;
    const handler = EVENT_HANDLERS.get(eventName)?.[eventType];
    if (typeof handler === 'function') handler(...args);
    else console.warn(`No handler found for event: ${eventName}/${eventType}`);
};

const unListener = (eventName) => {
    if (eventName) return EVENT_HANDLERS.delete(eventName);
    if (isEventListenerInitialized) {
        window.removeEventListener('message', handleMessageReceived);
        isEventListenerInitialized = false;
    }
};

const onListener = (eventName, eventHandlers) => {
    if (typeof eventName !== 'string' || !eventName) throw new Error('eventName must be a non-empty string');
    if (!eventHandlers || typeof eventHandlers !== 'object') throw new Error('eventHandlers must be an object');
    EVENT_HANDLERS.set(eventName, eventHandlers);
    if (!isEventListenerInitialized) {
        window.addEventListener('message', handleMessageReceived);
        isEventListenerInitialized = true;
    }
    return { remove: () => EVENT_HANDLERS.delete(eventName) || (EVENT_HANDLERS.size === 0 && unListener()) };
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

export { post, onListener, unListener, emit, emitDebug };
