const obj = {a: 1}

Object.defineProperty(obj, 'a', {
    configurable: false,
    enumerable: false,
    value: 10,
    writable: false
})

const proxyObj = new Proxy(obj, {
    get(target, prop) {
        return prop in target ? target[prop] : 0;
    },

    set(target, prop, value) {
        target[prop] = 888
    }
});

console.log(proxyObj.a);
console.log(proxyObj.b);

proxyObj.b = 123;
console.log(proxyObj.b);