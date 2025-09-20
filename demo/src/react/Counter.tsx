import React, { useState } from 'react';

interface CounterProps {
  title: string;
}

const Counter: React.FC<CounterProps> = ({ title }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const decrement = () => {
    setCount(prev => prev - 1);
  };

  return (
    <div className="counter">
      <h3>{title}</h3>
      <div className="counter-display">
        <button onClick={decrement}>-</button>
        <span className="count">{count}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default Counter;
