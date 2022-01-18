const ListNode = require("../js/listnode");

function reverseStepK(head, k = 3) {
    const dummyHead = new ListNode(0);
    dummyHead.next = head;
    let $start = dummyHead;
    let $end = head;
    let i = 0;
    while($end) {
        i++;
        if (i % k === 0) {
            $start = reverse($start, $end.next);
            $end = $start.next;
        } else {
            $end = $end.next;
        }
    }

    function reverse(start, end) {
        let curr = start.next;
        let prev = start;
        const first = curr;

        while (curr !== end) {
            const temp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = temp;
        }

        start.next = prev;
        first.next = end;

        return first;
    }

    return dummyHead.next;
}

console.log(reverseStepK(ListNode.from([1,2,3,4,5,6,7,8]), 3).toArray())