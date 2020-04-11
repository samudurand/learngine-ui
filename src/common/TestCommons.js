export function flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
}

export function getFirstProperty(obj) {
    return obj[Object.keys(obj)[0]]
}