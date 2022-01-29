export function deepCopy(target: Array<any> | Object, map = new WeakMap()) {
    if (Array.isArray(target) || typeof target === 'object' && target !== null) {
        const cloneTarget = Array.isArray(target) ? [] : {};
        
        if (map.has(target)) {
            return map.get(target);
        }

        for (let key in target) {
            cloneTarget[key] = deepCopy(target[key], map);
        }

        map.set(target, cloneTarget);

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


type DiffLine = {[key: string]: {start: number, end: number}[]};
export function getDiffLine(): DiffLine {
    const child_process = require('child_process')
    const res = child_process.execSync('git diff origin/master', {encoding: 'utf8'});
    const blocks = res.split(/diff --git/);
    
    const map: DiffLine = {};

    blocks.forEach(b => {
        const lines = b.split('\n');

        const line1 = lines[0];
        if (!line1) return;
        const file = line1.split('b/')[1];
    
        if (/^(src)\S+([.js|.ts|.tsx])$/.test(file)) {
            const fileMapList: {start: number, end: number}[] = [];
            // 记录修改了多少行
            const changeLines: number[] = [];
            // 记录展示位置到修改位置差了多少行
            const deltaLines: number[] = [];

            // 匹配到修改多少处和行
            b.replace(/(?<=[\@]{2}).+(?=[\@]{2})/g, (r => {
                const [ start, line ] = r.split('+')[1].split(',').map(i => +i);
                fileMapList.push({ start: start, end: start + line });
                changeLines.push(0);
                deltaLines.push(0);
                return r;
            }));

            let i = -1;
            // 结束位置
            lines.push('@@');
            // 是否累加修行之前被展示出来的行数
            let deltaF = false; 
            lines.forEach((l) => {
                if (deltaF && !l.startsWith('-')) {
                    deltaLines[i]++
                }

                if (l.startsWith('@@')) {
                    i++;
                    deltaF = true;
                }

                if (l.startsWith('+')) {
                    deltaF = false;

                    if (i >= 0) {
                        changeLines[i]++
                    }
                }
            });

            changeLines.forEach((lins, idx) => {
                const item = fileMapList[idx];
                const delteLine = deltaLines[idx];

                if (lins > 0) {
                    if (!map[file]) {
                        map[file] = [];
                    }
                    const start = item.start + delteLine - 1;
                    map[file].push({
                        start,
                        end: start + lins - 1
                    })
                }
            })
        }
    });

    return map;
}