String.prototype.reverse = function() {
    if (this.length < 2) {
        return this;
    }
    const size = this.length;
    const charArr = [];

    for (let i = 0; i < size; i++ ) {
        charArr.unshift(this[i]);
    }

    return charArr.join('')
}

String.prototype.camel = function(div = /\_/g) {
    const iarr = this.split(div);

    if (iarr.length <= 1) {
        return this
    }

    for (let i = 1; i < iarr.length; i++) {
        iarr[i] = iarr[i].charAt(0).toUpperCase() + iarr[i].substring(1);
    }

    return iarr.join('')
}

String.prototype.numberFormat = function() {
    return this.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
}

String.prototype.delAdjacentSameChar = function() {
    let arr = this.split('');
    let currChar = '';
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== currChar) {
            res.push(arr[i]);
            currChar = arr[i];
        }
    }

    return res.join('')
}


console.log('12312331131313'.delAdjacentSameChar());