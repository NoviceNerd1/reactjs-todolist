import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track which todo is being edited

  // Persist todos to local storage
  function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  }

  // Add or edit a todo
  function handleAddTodos(todoValue) {
    if (todoValue.trim() === "") {
      alert("Todo cannot be empty!");
      return;
    }

    if (editIndex !== null) {
      // Edit an existing todo
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? todoValue : todo
      );
      setTodos(updatedTodos);
      persistData(updatedTodos);
      setEditIndex(null); // Reset editIndex
    } else {
      // Add a new todo
      const newTodoList = [...todos, todoValue];
      setTodos(newTodoList);
      persistData(newTodoList);
    }
  }

  // Delete a todo
  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(newTodoList);
    persistData(newTodoList);
  }

  // Edit a todo
  function handleEditTodo(index, setTodoValue) {
    setEditIndex(index); // Track the index of the todo being edited
    setTodoValue(todos[index]); // Set the input field with the value of the todo
  }

  // Load todos from local storage on mount
  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      const parsedTodos = JSON.parse(localTodos);
      if (parsedTodos && parsedTodos.todos) {
        setTodos(parsedTodos.todos);
      }
    }
  }, []);

  return (
    <>
      <h1>Todo App 📝</h1>
      <TodoInput handleAddTodos={handleAddTodos} editIndex={editIndex} />
      <TodoList
        todos={todos}
        handleDeleteTodo={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
      />
    </>
  );
}

export default App;
