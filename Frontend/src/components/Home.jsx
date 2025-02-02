import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Todolist from "./Todolist";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${server}/todo`, { withCredentials: true });
        setTodos(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (editingTodo) {
        const response = await axios.put(
          `${server}/todo/${editingTodo}`,
          { title, description },
          { withCredentials: true }
        );
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === editingTodo ? { ...todo, title, description } : todo
          )
        );
        toast.success("Todo updated successfully");
        setEditingTodo(null);
      } else {
        const response = await axios.post(
          `${server}/todo`,
          { title, description },
          { withCredentials: true }
        );
        // setTodos((prev) => [...prev, response.data]);
        toast.success("Todo added successfully");
      }
      setTitle("");
      setDescription("");
      window.location.reload();

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo._id);
    setTitle(todo.title);
    setDescription(todo.description);
  };

  if (!isAuthenticated) return <Navigate to={"/signup"} />;

  return (
    <div className="min-h-[94vh] w-full bg-gray-400 p-4 sm:p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="w-full max-w-md flex flex-col gap-4">
          <input
            className="w-full border-2 text-lg sm:text-xl outline-none border-gray-300 rounded-lg p-2"
            type="text"
            required
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full border-2 text-lg sm:text-xl outline-none border-gray-300 rounded-lg p-2"
            type="text"
            required
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={submitHandler}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-lg sm:text-xl"
          >
            {editingTodo ? "Update Todo" : "Add +"}
          </button>
          {editingTodo && (
            <button
              onClick={() => {
                setEditingTodo(null);
                setTitle("");
                setDescription("");
              }}
              className="w-full bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-lg sm:text-xl"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      <Todolist todos={todos} setTodos={setTodos} onEdit={handleEdit} />
    </div>
  );
};

export default Home;