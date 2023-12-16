"use client";
import { IoAddCircleSharp } from "react-icons/io5";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { addNote } from "../services/noteService";
import { useNotesContextProvider } from "../context/NotesContext";
import { useUserContextProvider } from "../context/UserContext";
import { MdOutlineDownloading } from "react-icons/md";

const AddTodo = () => {
  const { loading, setLoading } = useUserContextProvider();
  const [note, setNote] = useState({
    title: "",
    desc: "",
    level: "none",
  });
  const [error, setError] = useState(false);
  const { notes, setNotes } = useNotesContextProvider();
  const hanndelSubmit = async (e) => {
    setLoading({ ...loading, addNote: true });
    e.preventDefault();
    const { title, desc, level } = note;
    if (!title || !desc || level == "none") {
      setError(true);
      setLoading({ ...loading, addNote: false });
      return;
    }
    // calling api to save the user note
    try {
      const data = await addNote(note);
      data.success ? setNotes([...notes, data.result]) : toast.error(data.msg);
      setLoading({ ...loading, addNote: false });
      setNote({ title: "", desc: "", level: "none" });
    } catch (error) {
      toast.error(error.message);
      console.log("note is not added due to", error.message);
      setLoading({ ...loading, addNote: false });
    }
  };

  return (
    <div className="max-w-[600px] mx-auto bg-slate-200 p-2 my-2 rounded ">
      <h2 className="heading text-center">Add Todo</h2>

      <form onSubmit={hanndelSubmit} className="flex flex-col gap-2 ">
        {error && !note.title && (
          <p className="font-semibold px-2 text-red-500 capitalize  ">
            title is required*
          </p>
        )}
        <input
          onChange={(e) => {
            setNote({ ...note, title: e.target.value });
          }}
          value={note.title}
          type="text"
          placeholder="Task Title"
          className="field"
        />
        {error && !note.desc && (
          <p className="font-semibold px-2 text-red-500 capitalize  ">
            description is required*
          </p>
        )}
        <textarea
          onChange={(e) => {
            setNote({ ...note, desc: e.target.value });
          }}
          value={note.desc}
          className="field"
          placeholder="Task Description"
          id=""
          cols="30"
          rows="4"
        ></textarea>
        {error && note.level == "none" && (
          <p className="font-semibold px-2 text-red-500 capitalize  ">
            select the level of task*
          </p>
        )}
        <select
          value={note.level}
          onChange={(e) => {
            setNote({ ...note, level: e.target.value });
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="none" disabled>
            Select an option
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button className="btn2 flex justify-center items-center gap-2 max-w-[150px] w-full mx-auto">
          Add Task{" "}
          {loading.addNote ? (
            <MdOutlineDownloading size={"24px"} />
          ) : (
            <IoAddCircleSharp size={"24px"} />
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
