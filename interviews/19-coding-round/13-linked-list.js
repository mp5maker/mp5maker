class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const first = new ListNode(10);
const second = new ListNode(20);
first.next = second;

const printList = (head) => {
  let current = head;

  while (current !== null) {
    console.log(current.value);
    current = current.next;
  }
};

console.log(printList(first));

const reverseList = (head) => {
  let previous = null;
  let current = head;

  while (current !== null) {
    const next = current.next;
    // B Node, C Node
    current.next = previous;
    // A Node -> next -> null, B Node -> next -> A Node -> next -> null
    previous = current;
    // previous -> A Node -> next -> null, B Node -> next -> A Node -> next -> null
    current = next;
    // B Node, C Node
  }

  return previous;
};

console.log(reverseList(first));
