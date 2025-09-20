import Fnec from '../../../FnecJS/packages/fnec/src/fnec';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  title: string;
}

const TodoList = ({ title }: TodoListProps) => {
  // Note: FnecJS doesn't have useState yet, so this is a simplified version
  let todos: TodoItem[] = [];
  let inputValue = '';

  const addTodo = () => {
    if (inputValue.trim()) {
      todos.push({
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      });
      inputValue = '';
      // Re-render logic will be handled by FnecJS
    }
  };

  const toggleTodo = (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      // Re-render logic will be handled by FnecJS
    }
  };

  const deleteTodo = (id: number) => {
    const index = todos.findIndex(t => t.id === id);
    if (index > -1) {
      todos.splice(index, 1);
      // Re-render logic will be handled by FnecJS
    }
  };

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    inputValue = target.value;
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="todo-list">
      <h3>{title}</h3>
      <div className="todo-input">
        <input
          type="text"
          value={inputValue}
          onInput={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todos">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="todo-stats">
        Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}
      </div>
    </div>
  );
};

export default TodoList;
