class _Promise {
    constructor(handeleMain) {
        if (typeof handeleMain !== 'function') {
            throw new Error('_Promise must accept a function as a parameter');
        }
        // 添加状态
        this._status = 'PENDING';
        // 添加状态
        this._value = undefined;
        // 成功队列
        this.fullfilledQueues = [];
        // 失败队列
        this.rejectedQueues = [];

        try {
            handeleMain(this.onFullfilled.bind(this), this.onRejected.bind(this));
        } catch (error) {
            this.onRejected(error);
        }
    }

    onFullfilled(val) {
        if (this._status !== 'PENDING') return;
        const handle = () => {
            this._status = 'FULFILLED';
            this._value = val; 
        }
    }

    onRejected(error) {
        if (this._status !== 'PENDING') return;

        this._status = 'REJECTED';
        this._value = error;
    }

    then(onFulfilled, onRejected) {
        const { _value, _status } = this;
        return new _Promise((onFullfilledNext, onRejectedNext) => {
            // 定义一个成功回调
            const fulFilled = value => {
                try {
                    if (typeof onFulfilled !== 'function') {
                        onFullfilledNext(value);
                    } else {
                        const res = onFulfilled(value);
                        if (res instanceof _Promise) {
                            res.then(onFullfilledNext, onRejectedNext)
                        } else {
                            onFullfilledNext(res);
                        }
                    }
                } catch (error) {
                    onRejectedNext(error)
                }
            };

            // 定义一个失败回调
            const rejected = error => {
                try {
                    if (typeof onRejected !== 'function') {
                        onRejectedNext(error);
                    } else {
                        const rejectValue = onRejected(error);
                        if (rejectValue instanceof _Promise) {
                            res.then(onFullfilledNext, onFullfilledNext);
                        } else {
                            onFullfilledNext(rejectValue);
                        }
                    }
                } catch (error) {
                    onRejectedNext(error);
                }
            };

            // 当前状态判断
            switch (_status) {
                case 'PENDING':
                    this.fullfilledQueues.push(fulFilled);
                    this.fullfilledQueues.push(rejected)
                    break;
                case 'FULFILLED':
                    fulFilled(_value);
                    break;
                case 'REJECTED':
                    rejected(_value);
                    break;
            }
        });
    }

    catch(onRejected) {
        return this.then(undefined, onRejected);
    }
}




// new Promise((resolve) => {
//     setTimeout(() => {
//         resolve('wang')
//     }, 0)
// }).then((i) => {
//     console.log(i)
//     return 'li'
// }).then((j) => {
//     console.log(j)
//     return 'dan'
// }).then(k => {
//     console.log(k)
// })

setTimeout(() => {
    console.log(`start`)
}, 0)

// Promise.resolve(1).then((i) => {
//     console.log(i)
//     return 'li'
// }).then((j) => {
//     console.log(j)
//     return 'dan'
// }).then(k => {
//     console.log(k)
// })