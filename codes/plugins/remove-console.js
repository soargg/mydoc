"use strict";

module.exports = ({ types: t }) => ({
    name: 'remove-console',
    visitor: {
        CallExpression(path, state) {
            const callee = path.get("callee");
            // 非成员函数的，不管
            if (!callee.isMemberExpression()) return;

            if (isIncludedConsole(callee, state.opts.exclude)) {
                // console.log、 console.log.call、console.log.apply
                if (path.parentPath.isExpressionStatement()) {
                    path.remove();
                } else if (path.parentPath.isVariableDeclarator()) {
                    // var 定义
                    path.replaceWith(createNoop(t));
                } else {
                    path.replaceWith(createVoid0(t));
                }
            } else if (isIncludedConsoleBind(callee, state.opts.exclude)) {
                // console.log.bind 替换空函数
                path.replaceWith(createNoop(t));
            }
        },
        MemberExpression: {
            exit(path, state) {
                if (isIncludedConsole(path, state.opts.exclude) && !path.parentPath.isMemberExpression()) {
                    if (path.parentPath.isAssignmentExpression() && path.parentKey === 'left') {
                        // 赋值表达式 console.log = hello();
                        path.parentPath.get('right').replaceWith(createNoop(t));
                    } else {
                        path.replaceWith(createNoop(t))
                    }
                }
            }
        }
    }
});


function isGlobalConsoleId(id) {
    const name = 'console';
    return id.isIdentifier({ name }) && !id.scope.getBinding(name) && id.scope.hasGlobal(name)
}

function isExcluded(property, excludeArray) {
    return Array.isArray(excludeArray) && excludeArray.some(name => property.isIdentifier({ name }))
}

function isIncludedConsole(memberExpr, excludeArray) {
    const object = memberExpr.get('object');
    const property = memberExpr.get('property');

    if (isExcluded(property, excludeArray)) return false;

    if (isGlobalConsoleId(object)) return true;

    return isGlobalConsoleId(object.get("object")) && ( property.isIdentifier({ name: 'call' }) || property.isIdentifier({ name: 'apply' }) );
}

function isIncludedConsoleBind(memberExpr, excludeArray) {
    const object = memberExpr.get('object');

    if (!object.isMemberExpression()) return false;
    if (isExcluded(object.get('property'), excludeArray)) return false;

    return isGlobalConsoleId(object.get("object")) && memberExpr.get('property').isIdentifier({ name: 'bind' })
}

function createNoop(t) {
    return t.functionExpression(null, [], t.blockStatement([]))
}

function createVoid0(t) {
    return t.unaryExpression('void', t.numericLiteral(0));
}
