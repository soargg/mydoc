# @bable/types API文档

### valueToNode

将JS数据转换成node节点

```js
types.valueToNode({ age: 18 }
```

```json
{
  "type": "ObjectExpression",
  "properties": [
    {
      "type": "ObjectProperty",
      "key": {
        "type": "Identifier",
        "name": "age"
      },
      "value": {
        "type": "NumericLiteral",
        "value": 18
      },
      "computed": false,
      "shorthand": false,
      "decorators": null
    }
  ]
}
```

### returnStatement

return 语句

- argument?: Expression | null

`return` 

### blockStatement

- `Array<Statement>`
- `Array<Directive>`

块结构

```js
T.blockStatement([T.returnStatement(t.valueToNode(123))])
// {  return 123 }
```

### callExpression

方法调用

- identifier 节点 方法名
- Array  参数

### identifier

变量名称，身份

- String 标识

### memberExpression

成员表达式

- 父对象
- 子属性

- computed 

```js
T.memberExpression(T.identifier('data'), T.identifier('name'));
// data.name

T.memberExpression(T.identifier('data'), T.stringLiteral('name'), true);
// data["name"]
```



