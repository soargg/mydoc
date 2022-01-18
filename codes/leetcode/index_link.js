const ListNode = require('../js/listnode');

function removeLastNthNode(head, n) {
    const noop = {next: null, value: null};
    let i = 0;
    const dummyHead = new ListNode(null);

    dummyHead.next = head;
    
    let currentP1 = dummyHead;
    let currentP2 = dummyHead;

    while (currentP1.next) {
        i++;
        if ( i > n) {
            currentP2 = currentP2.next;
        }
        currentP1 = currentP1.next;
    }

    currentP2.next = ((currentP2 || noop).next || noop).next;
    
    return head;
}

// console.log(removeLastNthNode(ListNode.from([1,2,3,4,5]), 2).toArray());

function reverseStepK(head, k) {
    const dummyHead = new ListNode(0);
    dummyHead.next = head;
    let $start = dummyHead;
    let $end = head;
    let i = 0;

    while ($end) {
        i++;
        if (i % k === 0) {
            $start = reverse($start, $end.next);
            $end = $start.next;
        } else {
            $end = $end.next;
        }
    }

    function reverse(start, end) {
        let perv = start;
        let curr = start.next;
        const first = curr;

        while(curr !== end) {
            let temp = curr.next;
            curr.next = perv;
            perv = curr;
            curr = temp;
        }

        start.next = perv;
        first.next = end;

        return first;
    }

    return dummyHead.next;
}

// console.log(reverseStepK(ListNode.from([1,2,3,4,5,6,7,8]), 3).toArray())

function reverseListTow(head) {
    const dummyHead = new ListNode(null);
    dummyHead.next = head;
    let $p = dummyHead

    while ($p.next && $p.next.next) {
        let first = $p.next;
        let second = $p.next.next;
    
        first.next = second.next;
        second.next = first;
        $p.next = second;

        $p = $p.next.next;
    }

    return dummyHead.next;
}

function mergeKList(listArr) {
    return listArr.reduce((l1, l2) => {
        const dummyHead = new ListNode(null);
        let $p = dummyHead;
        
        while(l1 && l2) {
            if (l1.value > l2.value) {
                $p.next = l2;
                l2 = l2.next;
            } else {
                $p.next = l1;
                l1 = l1.next;
            }

            $p = $p.next;
        }

        $p.next = l1 ? l1 : l2;

        return dummyHead.next
    });
}

console.log(mergeKList([
    ListNode.from([1,3,5]),
    ListNode.from([1,2,7]),
    ListNode.from([2,6])
]).toArray());

console.log(reverseListTow(ListNode.from([1,2,3,4,5,6,7,8])).toArray())