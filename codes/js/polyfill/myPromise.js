class _Promise {

    constructor(handleMain) {
        if (typeof handleMain !== 'function') {
            throw new Error('_Promise 接受一个函数作为参数');
        }
        this._status = 'PENDING';
        this._value = null;
        this._fulfilledQueues = [];
        this._rejectedQueues = [];

        try {
            handleMain(this.onFullfilled.bind(this), this.onRejected.bind(this));
        } catch (error) {
            this.onRejected(error);
        }
    }

    onFullfilled(val) {
        if (this._status !== 'PENDING') return;
        this._status = 'FULLFILLED';
        this._value = val;

        const run = () => {
            let cb;
            while (cb = this._fulfilledQueues.shift()) {
                cb(val);
            }
        };
        setTimeout(() => run(), 0);
    }

    onRejected(error) {
        if (this._status !== 'PENDING') return;
        this._status = 'REJECTED';
        this._value = error;

        const run = () => {
            let cb;
            while (cb = this._rejectedQueues.shift()) {
                cb(error);
            }
        }
        setTimeout(() => run(), 0);
    }

    then(onFullfilled, onRejected) {
        return new _Promise((onFullfilledNext, onRejectedNext) => {
            const fulFilled = (value) => {
                try {
                    if (typeof onFullfilled !== 'function') {
                        onFullfilledNext(value);
                    } else {
                        const res = onFullfilled(value);
                        if (res instanceof _Promise) {
                            res.then(onFullfilledNext, onRejectedNext);
                        } else {
                            onFullfilledNext(res);
                        }
                    }
                } catch (error) {
                    onFullfilledNext(error)
                }
            };

            const rejected = (error) => {
                try {    
                    if (typeof onRejected !== 'function') {
                        onRejectedNext(error);
                    } else {
                        const rejectedValue = onRejected(error);
                        if (rejectedValue instanceof _Promise) {
                            rejectedValue.then(onFullfilledNext, onRejectedNext);
                        } else {
                            onRejectedNext(rejectedValue);
                        }
                    }
                } catch (catchError) {
                    onRejectedNext(catchError);
                }
            }

            switch (this._status) {
                case 'PENDING':
                    this._fulfilledQueues.push(fulFilled);
                    this._rejectedQueues.push(rejected);
                    break;
                case 'FULLFILLED':
                    fulFilled(this._value);
                case 'REJECTED':
                    rejected(this._value);
                    break;
            }
        })
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    static reslove(value) {
        if (value instanceof _Promise) return value;
        return new _Promise(reslove => reslove(value));
    }

    static rejected(err) {
        return new _Promise((_, rejected) => rejected(err));
    }
}

_Promise.prototype.finally = function(callBack) {
    let P = this.constructor;
    return this.then(
        value => P.reslove(callBack()).then(() => value),
        err => P.reslove(callBack()).then(() => { throw err })
    )
}

new _Promise((reslove) => {
    setTimeout(reslove, 500, 123)
    throw new Error(12331231)
}).catch(err => {
    console.log(err)
})

