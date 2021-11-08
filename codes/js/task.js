// function run() {
//     console.log('start')
//     setTimeout(() => {
//         console.log('timer1')
//         Promise.resolve().then(function () {
//             console.log('promise1')
//         })
//     }, 0)
//     setTimeout(() => {
//         console.log('timer2')
//         Promise.resolve().then(function () {
//             console.log('promise2')
//         })
//     }, 0)
//     Promise.resolve().then(function () {
//         console.log('promise3')
//     })
//     console.log('end')
// }

// run();

// console.log('start')
// setImmediate(() => {
//     console.log('setImmediate')
// });

// setTimeout(() => {
//     console.log('timer1')
//     Promise.resolve().then(function () {
//         console.log('promise1')
//     })
// }, 1)
// setTimeout(() => {
//     console.log('timer2')
//     Promise.resolve().then(function () {
//         console.log('promise2')
//     })
// }, 0)
// Promise.resolve().then(function () {
//     console.log('promise3')
// });

// console.log('end')

// setTimeout(()=>{
//     console.log('timer1')
//     Promise.resolve().then(function() {
//         console.log('promise1')
//     })
// }, 0)
// setTimeout(()=>{
//     console.log('timer2')
//     Promise.resolve().then(function() {
//         console.log('promise2')
//     })
// }, 0)
// Promise.resolve().then(function () {
//     console.log('promise0')
// })

// setTimeout(() => {
//     console.log('timer1')
//     Promise.resolve().then(function () {
//         console.log('promise1')
//     })
// }, 0)

// process.nextTick(() => {
//     console.log('nextTick1')
//     Promise.resolve().then(function () {
//         console.log('promise2')
//     })
//     process.nextTick(() => {
//         console.log('nextTick2')
//         process.nextTick(() => {
//             console.log('nextTick3')
//             process.nextTick(() => {
//                 console.log('nextTick4')
//             })
//         })
//     })
// })

// setImmediate(() => {
//     console.log(`setImmediate`)
// })

// const fs = require('fs');

// fs.readFile('./index.js', (err, data) => {
//     setTimeout(() => {
//         console.log(`setTimeout`);
//     }, 0)

//     setImmediate(() => {
//         console.log(`setImmediate`);
//     });
// })

// setTimeout(() => {
//     console.log(`setTimeout->out`);
// }, 0)

// setImmediate(() => {
//     console.log(`setImmediate -> out`);
// });

let a, b;
process.nextTick(() => {
    console.log('1=>', a+b);
});

a=1;b=2;
setTimeout(() => {
    process.nextTick(() => {
        console.log('2=>', a+b);

        process.nextTick(() => {
            a=7,b=8;
            console.log('4=>', a+b);
        });
    });
    a=3;b=4;
}, 0)

setImmediate(() => {
    process.nextTick(() => {
        console.log('3=>', a+b);
    });
    a=5;b=6;
})