import React from "react";
import AddTodo from "./components/AddTodo";
import { TodoItem } from "./components/Server";
export const metadata = {
  title: "Home:This is Todo App",
  description: "Generated by This is Todo App",
};
const HomePage = () => {
  return (
    <div className="container">
      <AddTodo />

      <h2 className="font-semibold capitalize">your notes</h2>
      <div className=" grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-4">
        <TodoItem
          title={"this is the title"}
          desc={"this is the description"}
        />
      </div>
    </div>
  );
};

export default HomePage;