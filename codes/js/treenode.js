const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

/**
 * 2  4,5
 * 3  6,7
 * 4  8,9
 * 5, 10,11,
 * 6, 12,13,
 * 7, 14,15
 */

function TreeNode(arr) {
    if (!Array.isArray(arr)) return;

    const root = {value: null, left: null, right: null}
    const size = arr.length;

    function nextNode (node, index = 0) {
        if (index < size) {
            node.value = arr[index];
            const p = 2 * (index + 1) - 1;

            if (p < size) {
                node.left = {value: null, left: null, right: null}
                nextNode(node.left, p)
            }

            if (p + 1 < size) {
                node.right = {value: null, left: null, right: null}
                nextNode(node.right, p + 1)
            }
        }
    }

    nextNode(root, 0);

    return root;
}

console.log(JSON.stringify(TreeNode(arr)));