const ListNode = require("../js/listnode");

function reverseStepK(head, k = 3) {
    const dummyHead = new ListNode(null);
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
        let prev = start;
        let curr = start.next;
        const first = curr;

        while (curr !== end) {
            const tmp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = tmp;
        }

        start.next = prev;
        first.next = end;

        return first;
    }

    return dummyHead.next;
}

console.log(reverseStepK(ListNode.from([1,2,3,4,5,6,7,8]), 4).toArray())

// function reverseLiist(head) {
//     let $p = null;

//     while(head) {
//         let temp = head.next;
//         head.next = $p;
//         $p = head;
//         head = temp;
//     }

//     return $p;
// }

// console.log(reverseLiist(ListNode.from([1,2,3,4,5,6,7,8])).toArray())