console.log('begin');

setImmediate(() => {
    console.log('setImmediate');
    setTimeout(() => {
        //宏任务
        console.log('setImmediate -> setTimeout')
    
    }, 0);
    Promise.resolve().then(() => {
        //微任务
        console.log('setImmediate -> promise1');
    
    });
    Promise.resolve().then(() => {
        //微任务
        console.log('setImmediate -> promise2');
    
    });
});

setTimeout(() => {
    //宏任务
    console.log('setTimeout')

}, 0);

Promise.resolve().then(() => {

    //微任务

    console.log('promise');

});

console.log('end');