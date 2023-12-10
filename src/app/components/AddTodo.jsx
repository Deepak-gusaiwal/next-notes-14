import React from "react";

const AddTodo = () => {
  return (
    <div className="max-w-[600px] mx-auto bg-slate-200 p-2 my-2 rounded ">
      <h2 className="heading text-center">Add Todo</h2>

      <form className="  flex flex-col gap-2 ">
        <input type="text" placeholder="Task Title" className="field" />
        <textarea
        className="field"
          placeholder="Task Description"
          id=""
          cols="30"
          rows="4"
        ></textarea>
        <button className="btn2 max-w-[150px] w-full mx-auto">Add Task</button>
      </form>
    </div>
  );
};

export default AddTodo;
