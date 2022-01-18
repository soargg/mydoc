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

const promise1 = new Promise(resolve=>setTimeout(resolve, 2000, 456))
const promise2 = Promise.resolve('123')

function promiseAll(promiseArr) {
    return new Promise((reslove, reject) => {
        const data = [];
        let count = 0;

        promiseArr.forEach((pitem, index) => {
            pitem.then(res => {
                count++;
                data[index] = res;

                if (count === promiseArr.length) {
                    reslove(data);
                };
            }).catch(err => {
                reject(err);
            })
        })
    })
}

// promiseAll([promise1, promise2]).then(r => {
//     console.log(r);
// })

// function* rang(start, end) {
//     for (let i = start; i< end; i++) {
//         yield i
//     }
// }
// (async () => {
//     const res = rang(0, 3);
//     console.log(res.next())
//     for await (const item of res) {
//         console.log(item)
//     }
// })()

function* rang() {
    for (let i = 0; i < 3; i++) {
        yield i
    }
}

(async () => {
    const res = rang()
    for (const item of res) {
        console.log(item)
    }
})()