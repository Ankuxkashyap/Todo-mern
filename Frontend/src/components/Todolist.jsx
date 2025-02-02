import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";

const Todolist = ({ todos = [], setTodos, onEdit }) => {  // Default todos to []
  console.log("Todos received:", todos);  // Debugging

  const toggleTodoCompletion = async (id) => {
    const todo = todos.find((todo) => todo?._id === id);  // Safe check
    if (!todo) {
      toast.error("Todo not found");
      return;
    }

    try {
      await axios.put(
        `${server}/todo/${id}`,
        { isCompleted: !todo.isCompleted },
        { withCredentials: true }
      );
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t._id === id ? { ...t, isCompleted: !t.isCompleted } : t
        )
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to update todo");
    }
  };

  const deleteTodoHandler = async (id) => {
    const todo = todos.find((todo) => todo?._id === id);  // Safe check
    try {
      await axios.delete(`${server}/todo/${id}`, { withCredentials: true });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      toast.success("Todo deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete todo");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4">My Todos</h2>
      <ul className="list-none pl-0 flex flex-col items-center">
        {todos?.length > 0 ? (  // Safe optional chaining
          todos.map((todo) =>
            todo ? (  // Ensure todo is defined
              <li
                key={todo._id}
                className="w-full sm:w-[80vw] md:w-[60vw] lg:w-[50vw] text-lg p-4 border-2 rounded-2xl m-2 border-gray-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="flex-1">
                  <strong className="text-2xl sm:text-3xl font-mono italic">
                    {todo.title}
                  </strong>
                  <br />
                  <span className="text-gray-600">{todo.description}</span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    className="h-6 w-6 sm:h-7 sm:w-7 bg-black"
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => toggleTodoCompletion(todo._id)}
                  />
                  <button
                    className="p-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => onEdit(todo)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="p-2 bg-red-500 text-white rounded-lg"
                    onClick={() => deleteTodoHandler(todo._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </li>
            ) : null
          )
        ) : (
          <li className="text-lg p-3 border-b border-gray-300">No todos found</li>
        )}
      </ul>
    </div>
  );
};

export default Todolist;
