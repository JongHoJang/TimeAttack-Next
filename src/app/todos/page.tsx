"use client";

import { useEffect, useState } from "react";
import { Todo } from "../type/types";

const TodosPage = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch("http://localhost:4000/todos");
    const todoList: Todo[] = await response.json();
    setTodoList(todoList);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  };

  const handleAddTodo = async () => {
    const newTodo: Todo = {
      id: Number(crypto.randomUUID()),
      title,
      contents,
      isDone: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
  };

  const deleteTodo = async (id: Todo["id"]) => {
    await fetch(`http://localhost:4000/todos/${id}`, {
      method: "Delete",
    });
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const makeDone = async (id: Todo["id"]) => {
    await fetch(`http://localhost:4000/todos/${id}`, {
      method: "Patch",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isDone: true,
      }),
    });
  };

  return (
    <>
      <div>
        제목 : <input value={title} onChange={handleTitleChange} />
        내용 : <input value={contents} onChange={handleContentsChange} />
        <button onClick={handleAddTodo}>추가하기</button>
      </div>

      <div className="bg-red-500">
        <div>Working!!!</div>
        <div>
          {todoList
            .filter((todo) => !todo.isDone)
            .map((todo) => (
              <div key={todo.id}>
                {todo.title}
                {todo.contents}
                <div>
                  <button onClick={() => deleteTodo(todo.id)}>삭제하기</button>
                  <button onClick={() => makeDone}>완료</button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-blue-500">
        <div>Done!!!</div>
        <div>
          {todoList
            .filter((todo) => todo.isDone)
            .map((todo) => (
              <div key={todo.id}>
                {todo.title}
                {todo.contents}
                <div>
                  <button onClick={() => deleteTodo(todo.id)}>삭제하기</button>
                  <button>취소</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TodosPage;
