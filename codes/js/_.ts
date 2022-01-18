export function deepCopy(target: Array<any> | Object) {
    if (Array.isArray(target) || typeof target === 'object' && target !== null) {
        const cloneTarget = Array.isArray(target) ? [] : {};
        
        for (let key in target) {
            cloneTarget[key] = deepCopy(target[key]);
        }

        return cloneTarget;
    }

    return target;
}

// 将颜色rgb转换为16进制
export function rgb2hex(str: string): string {
    const numArr = str.match(/\d+/g).map(i => +i);
    // return `#${numArr.map(n => `${ +n < 16 ? '0' : '' }${(+n).toString(16)}`).join('')}`;
    const [r, g, b] = numArr;
    return '#' + ((r << 16) + (g << 8) + b).toString(16);
}

export function number_format(n: number | string): string {
	const reg=/\d{1,3}(?=(\d{3})+$)/g;
    return `${n}`.replace(reg, '$&,')
}
