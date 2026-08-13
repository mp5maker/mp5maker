// First In, First Out

const createQueue = () => {
  const items = [];
  let front = 0;

  return {
    enqueue(value) {
      items.push(value);
    },
    dequeue() {
      if (front >= items.length) {
        return undefined;
      }

      return items[front++];
    },
    isEmpty() {
      return front >= items.length;
    },
  };
};



const q = createQueue()
q.enqueue("A")
q.enqueue("B")
q.enqueue("C")
console.log(q.dequeue())
console.log(q.dequeue())