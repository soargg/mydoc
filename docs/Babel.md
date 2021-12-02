# Babel

## traverse

### 几种常见的遍历

1. 获取方法名为`require`的方法调用

```js
CallExpression(path) {
  if (path.get('callee').isIdentifier({name: 'require'})) {}
}
```



## 插件

**@babel/plugin-proposal-decorators**

插件支持类的装饰器语法，包括类装饰器，属性装饰器，方法装饰器；

```shell
npm install -D @babel/plugin-proposal-decorators
```

- **decoratorsBeforeExport** `boolean`默认false

export语法是否在装饰器之前

```js
// decoratorsBeforeExport: false
export @decorator class A {}

// decoratorsBeforeExport: true
@decorator
export class A {}
```

## 自定义插件

**切换默认导出** `toExoprtDefault`

```js
// 转换前
export { ClassA as default }
// 转换后
export default ClassA;
```

**用法**

```javascript
babel.transformSync(code, {
  plugins: [
    toExoprtDefault
  ]
});
```

**实现**

```js
const { template } = require('@babel/core');
const toExoprtDefault = () => {
    let temp = null;
    return {
        visitor: {
            Program: {
                enter() {
                    temp = null;
                },
                exit(path) {
                    if (temp && temp.node && temp.node.local) {
                        const identifierName = temp.node.local.name;
                        const exportDefaultTemp = template(`export default ${identifierName};`)
                        path.node.body.push(exportDefaultTemp());
                    }
                }
            },
            ExportDeclaration(path) {
                path.traverse({
                    ExportSpecifier(spePath) {
                        if (spePath.get('exported').isIdentifier({name: 'default'})) {
                            temp = spePath;
                        }
                    }
                });

                if (temp) {
                    path.remove(temp)
                }
            }
        }
    }
}
```

