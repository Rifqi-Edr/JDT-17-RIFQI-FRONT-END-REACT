import { useState } from "react";

interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    console.log("add");
    setTodos((prev) => [
      ...prev,
      { id: Date.now().toString(), text, isCompleted: false },
    ]);
  };

  const removeTodo = () => {
    console.log("remove");
  };

  const toggleTodo = () => {
    console.log("toggle");
  };

  return { addTodo, removeTodo, toggleTodo, todos };
};

export default useTodo;
