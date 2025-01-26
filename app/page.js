"use client"
import { useState, useEffect } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const data = await response.json();
    setTodos(data.data);
  };

  const addTodo = async () => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodo }),
    });
    if (response.ok) {
      setNewTodo('');
      fetchTodos();
    }
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`/api/todos?id=${id}`, {
      method: 'DELETE',
    });
    if (response.ok) fetchTodos();
  };

  return (
        <div className="container">
          <h1 className='text-black'>To-Do List</h1>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
            className='text-black'
            style={{width: "89%"}}
          />
          <button onClick={addTodo}>Add</button>
          <ul>
            {todos.map((todo) => (
              <li key={todo._id}>
                <span className='text-black'>{todo.text}</span>
                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
  );
}
