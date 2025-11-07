import Fnec from 'fnecjs';
import Counter from './Counter';
import TodoList from './TodoList';

const App = () => {
  return (
    <div className="container">
      <h1>FnecJS Demo - useState Hook</h1>
      
      <div className="demo-section">
        <h2>Counter Component</h2>
        <Counter />
      </div>
      
      <div className="demo-section">
        <h2>Todo List Component</h2>
        <TodoList />
      </div>
    </div>
  );
};

const container = document.getElementById('root');
Fnec.render(<App />, container!);
