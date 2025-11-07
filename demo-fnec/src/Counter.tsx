import Fnec from 'fnecjs';

const Counter = () => {
  const [count, setCount] = Fnec.useState(0);
  function increment() {
    setCount((prev: number) => prev + 1);
  }
  
  function decrement() {
     setCount((prev: number) => prev - 1);
  }

  const reset = () => setCount(0);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2em', margin: '20px 0', color: '#333' }}>
        Count: {count}
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          onClick={decrement}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          -
        </button>
        <button 
          onclick={reset}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#74c0fc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
        <button 
          onClick={increment}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#51cf66',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
