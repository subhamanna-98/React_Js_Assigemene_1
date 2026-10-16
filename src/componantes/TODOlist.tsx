import React, { useEffect, useState } from "react";
import type { TodoItem } from "../interface/TODOLIST";

const TODOlist = () => {
  const [inputVal, setInputVal] = useState<string>("");
  const [todos, setTodos] = useState<TodoItem[]>(()=>{
    const saved = localStorage.getItem("my_todos")
    return saved ? JSON.parse(saved) : []
  })
  useEffect(() => {
    localStorage.setItem("my_todos" ,JSON.stringify(todos))
  },[todos])
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const newToDo: TodoItem = {
      id: Date.now(),
      text: inputVal.trim(),
      isCompleted: false,
    };
    setTodos((prev) => [newToDo, ...prev]);
    setInputVal("");
  };
  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };
  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
        {/* HEADER */}
        <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-800">To-do Planner</h1>
            <p className="text-xs text-slate-500">Manage daily tasks & goals</p>
          </div>
          <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2.5 py-1 rounded-full border border-indigo-100">
            {todos.filter((t) => t.isCompleted).length} / {todos.length} Done
          </span>
        </div>

        {/* INPUT-FORM */}
        <form onSubmit={handleAddTodo} className="flex gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-800 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Add
          </button>
        </form>

        {/* TASK-LIST */}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-center text-xs text-slate-400 py-6">
              No tasks added yet. Type something above!
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  todo.isCompleted
                    ? "bg-slate-50 border-slate-200/60"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
                }`}
              >
                {/* CHECHBOX-TEXT*/}
                <label className="flex items-center gap-3 cursor-pointer flex-1 select-none mr-2">
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => handleToggle(todo.id)}
                    className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span
                    className={`text-sm break-all transition-all ${
                      todo.isCompleted
                        ? "line-through text-slate-400"
                        : "text-slate-700"
                    }`}
                  >
                    {todo.text}
                  </span>
                </label>

                {/* DELETE-BTN */}
                <button
                  type="button"
                  onClick={() => handleDelete(todo.id)}
                  aria-label="Delete task"
                  className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default TODOlist;
