/**
 * 1 实现一个instanceof
 * // 判断a是否在b的原型链上
 */
// 1
function _instanceof(a, b) {
    if (a.__proto__ === b.prototype) {
        return true;
    }
    
    if (a.__proto__ === null) {
        return false;
    }

    return _instanceof(a.__proto__, b);
}
// 2
function __instanceof(a, b) {
    let L = a.__proto__;
    let R = b.prototype;

    while(L !== null) {
        if (L === R) {
            return true;
        }
        L = L.__proto__;
    }

    return false;
}
class Person {};
const p = new Person();
console.log(__instanceof(p, Array));