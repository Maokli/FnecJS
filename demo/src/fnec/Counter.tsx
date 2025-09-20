import Fnec from '../../../FnecJS/packages/fnec/src/fnec';

interface CounterProps {
  title: string;
}

const Counter = ({ title }: CounterProps) => {
  // Note: We'll need to implement useState hook in FnecJS
  let count = 0;
  
  const increment = () => {
    count++;
    // Re-render logic will be handled by FnecJS
  };

  const decrement = () => {
    count--;
    // Re-render logic will be handled by FnecJS
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
