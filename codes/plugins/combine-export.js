/**
 * export const age = 18;
 * export class Student {};
 * export function hello {};
 *        | |
 *        | |
 *        V V
 *         V
 * const age = 18;
 * class Student {};
 * function hello {};
 * export { age, Student, hello }
 */

 module.exports = ({types, template}) => {
    const declarationNames = [];
    return {
        visitor: {
            Program: {
                enter(path) {
                    // console.log(JSON.stringify(path.node))
                },
                exit(path) {
                    if (declarationNames.length) {
                        const exportTemp = template(`export { ${declarationNames.join(',')} }`);
                        path.node.body.push(exportTemp());
                    }
                }
            },
            ExportNamedDeclaration(path) {
                if (path.node.declaration) {
                    const decNode = path.node.declaration;
                    if (types.isFunctionDeclaration(decNode) || types.isClassDeclaration(decNode)) {
                        declarationNames.push(decNode.id.name)
                    };
                    if (types.isVariableDeclaration(decNode)) {
                        const declist = decNode.declarations;
                        if (Array.isArray(declist)) {
                            declist.forEach(n => {
                                if (types.isVariableDeclarator(n)) {
                                    declarationNames.push(n.id.name);
                                }
                            })
                        }
                    };
                    path.replaceWith(path.node.declaration)
                }
            }
        }
    }
}