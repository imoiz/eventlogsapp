import { useState } from "react";

export default function ReturnInquiry() {
  const countInitialvalue = 0; // Example initial value
  const [count, setCount] = useState(countInitialvalue);
  const increment = () => {
    setCount(count + 1);
  }
  const decrement = () => {
    setCount(count - 1);
  }
  const incrementBy5 = () => {
    for (let i = 0; i < 5; i++) {
      setCount(count + 1);
    }
  }
  const incrementBy5UsingFunction = () => {
    for (let i = 0; i < 5; i++) {
   setCount(prevCount => prevCount + 1);
    }

  }

  return (
    <>
    <div>{count}</div>
    <button  value={countInitialvalue} onClick={increment}>Increment</button>
    <button  value={countInitialvalue} onClick={decrement}>Decrement</button>
    <button  value={countInitialvalue} onClick={incrementBy5}>IncrementBy5</button>
    <button  value={countInitialvalue} onClick={incrementBy5UsingFunction}>IncrementBy5UsingFunction</button>
    <button  value={countInitialvalue} onClick={() => setCount(countInitialvalue)}>Reset</button>
    </>
  )
}

