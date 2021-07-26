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
// class Person {};
// const p = new Person();
// console.log(__instanceof(p, Array));
// 1
function fun(n,o) {
    console.log(o)
    return {
      fun:function(m){
        return fun(m,n);
      }
    };
}
// var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);
// var b = fun(0).fun(1).fun(2).fun(3);
// var c = fun(0).fun(1);  c.fun(2);  c.fun(3);

// 2
// var a = [0];
// if (a) {
//     console.log(a == true);
// } else {
//     console.log("wut");
// }

// const res = [1,2,3,4,5].every((i, idx, arr) => {
//     arr.push(1)
//     return isFinite(i);
// });

// console.log(res)

const arr = [['a', 'b'], ['n', 'm'], ['0', '1']];
const res =  arr.reduce((xarr, tmpArr) => {
    var arr = [];
    xarr.forEach(i => {
        tmpArr.forEach(j => {
            arr.push(i+j)
        })
    })

    return arr;
}, [''])

console.log(res)