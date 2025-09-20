import React, { useState } from 'react';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  title: string;
}

const TodoList: React.FC<TodoListProps> = ({ title }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos(prev => [
        ...prev,
        {
          id: Date.now(),
          text: inputValue.trim(),
          completed: false
        }
      ]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-list">
      <h3>{title}</h3>
      <div className="todo-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
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
