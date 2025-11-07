import Fnec from 'fnecjs';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = Fnec.useState<Todo[]>([]);
  const [inputValue, setInputValue] = Fnec.useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos((prevTodos: Todo[]) => [...prevTodos, {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos: Todo[]) => 
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos: Todo[]) => prevTodos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prevTodos: Todo[]) => prevTodos.filter(todo => !todo.completed));
  };

  return (
    <div>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e: any) => setInputValue(e.target.value)}
          onKeyPress={(e: any) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          style={{
            flex: 1,
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4dabf7',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>

      {todos.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={clearCompleted}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              backgroundColor: '#ffa8a8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear Completed
          </button>
        </div>
      )}

      <div>
        {todos.map((todo: Todo) => (
          <div
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              border: '1px solid #eee',
              borderRadius: '4px',
              marginBottom: '8px',
              backgroundColor: todo.completed ? '#f8f9fa' : 'white'
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={{ marginRight: '10px' }}
            />
            <span
              style={{
                flex: 1,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#666' : '#333'
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {todos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
          No todos yet. Add one above!
        </p>
      )}
    </div>
  );
};

export default TodoList;
