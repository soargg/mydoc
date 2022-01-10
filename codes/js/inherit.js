/**
 * JS的6中继承方式
 */
function Person(name) {
    this.name = name;
}
Person.prototype = {
    age: 1,
    say() {
        console.log(this.name, `age: ${this.age}`);
    }
};

/**
 * 原型链继承
 * 重点：让新类原型的实例等于父类的实例
 * 特点：1、实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。（新实例不会继承父类实例的属性！）
 * 缺点：1、新实例无法向父类构造函数传参。
　　　　 2、继承单一。
　　　　 3、所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）
 */
function Student() {
    this.name = `student`;
}
Student.prototype = new Person();

// new Student().say();

/**
 * 借助构造函数
 * 重点 用.call()和.apply()将父类构造函数引入子类函数
 * 特点：1、只继承了父类构造函数的属性，没有继承父类原型的属性。
 *　　　 2、解决了原型链继承缺点1、2、3。
 *　　　 3、可以继承多个构造函数属性（call多个）。
 *　　　 4、在子实例中可向父实例传参。
 *　缺点：1、只能继承父类构造函数的属性。
 *　　　　2、无法实现构造函数的复用。（每次用每次都要重新调用）
 *　　　　3、每个新实例都有父类构造函数的副本，臃肿。
 */
function Teacher(name) {
    Person.call(this, name);
    this.age = 24;
    this.teach = function() {
        console.log(`hello, ${this.name}, ${this.age}`);
    }
}
// new Teacher('liyeg').teach();

// 组合继承 原型链继承和借用构造函数继承
function Children(name) {
    Person.call(this, name);
    this.age = 12;
}
Children.prototype = new Person();
// new Children('jjia').say();

// console.log(new Person().__proto__ === Person.prototype)
// console.log(Person.prototype.__proto__ === Object.prototype);

function instanceoOf(instance, parent) {
    const p = parent.prototype;

    let preP = instance.__proto__

    while(preP !== null) {
        if (preP === p) {
            return true;
        }

        preP = preP.__proto__;
    }

    return false;
}

console.log(instanceoOf(new Function, Function));


Function.prototype.myCall = function(context) {
    if (typeof this !== 'function') {
        throw new Error('Error');
    }
    context = context || window;
    context.fn = this;
    const result = context.fn(...Array.from(arguments).slice(1))
    delete context.fn;

    return result;
}
Function.prototype.myApply = function(context) {
    if (typeof this !== 'function') {
        throw new Error('Error');
    }

    context = context || window;
    context.fn = this;

    let result;
    if (Array.isArray(arguments[1])) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn;
    return result;
}


Function.prototype.myBind = function(context) {
    if (typeof this !== 'function') {
        throw new Error('Error');
    }
    
    const args = Array.from(arguments).slice(1);
    const _this = this;
    return function F() {
        if ( this instanceof F ) {
            return new _this(...args, ...arguments);
        }

        context = context || window;
        return _this.apply(context, args.concat([...arguments]));
    }
}

var arr = [1, 2];
const push = Array.prototype.push.bind(arr, 3, 4, 5);
push();
console.log(arr);