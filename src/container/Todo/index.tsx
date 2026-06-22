import { useState } from "react";
import useTodo from "../../hooks/useTodo";

const Todo = () => {
  const { todos, addTodo, removeTodo, toggleTodo } = useTodo();
  const [textTodo, setTextTodo] = useState<string>("");

  const handleAdd = () => {
    addTodo(textTodo)
    setTextTodo("")
  }

  return (
    <div className="flex">
      <input className="bg-white" onChange={(e) => setTextTodo(e.target.value)} />
      <button className="bg-white text-black" children="Add" onClick={handleAdd} />

      {todos.map((item) => (
        <p>{item.text}</p>
      ))}
    </div>
  );
};

export default Todo;
