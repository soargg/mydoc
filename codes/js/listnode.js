class ListNode {
    next = null;

    constructor(value) {
        this.value = value;
    }

    static from(arr) {
        let currNode = null;
        let node = null;
        for (let v of arr) {
            const temp = new ListNode(v)
            if (currNode === null) {
                currNode = temp;
                node = temp;
            } else {
                currNode.next = temp;
                currNode = temp;
            }
        }

        return node;
    }

    toArray() {
        let head = this;
        const res = [];
        while(head) {
            res.push(head.value);
            head = head.next;
        }

        return res;
    }
}

module.exports = ListNode;

// console.log(Link.from([1, 2 ,3]));