import React from "react";
import AddTodo from "./components/AddTodo";
import ShowTodos from "./components/ShowTodos";
export const metadata = {
  title: "Home:This is Todo App",
  description: "Generated by This is Todo App",
};
const HomePage = () => {
  return (
    <div className="container">
      <AddTodo />

      <ShowTodos />
    </div>
  );
};

export default HomePage;
