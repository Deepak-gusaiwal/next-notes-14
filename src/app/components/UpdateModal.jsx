"use client";
import React, { useState } from "react";
import { useNotesContextProvider } from "../context/NotesContext";
import { updateNote } from "../services/noteService";
import { toast } from "react-toastify";

const UpdateModal = () => {
  const {
    isModal,
    setModal,
    updateModalData,
    setUpdateModalData,
    notes,
    setNotes,
  } = useNotesContextProvider();
  const { title, desc, level, id } = updateModalData;
  const [error, setError] = useState(false);
  const handdleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !desc || level == "none") {
      setError(true);
      return;
    }
    // now calling the api to update the note
    try {
      const data = await updateNote(id, { title, desc, level });
      if (data.success) {
        toast.success(data.msg);
        setModal(false);
        const newNotes = notes.map((note) => {
          return note._id !== id ? note : { ...note, title, desc, level };
        });
        setNotes(newNotes);
        console.log("new notes are", newNotes, id);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error.msg);
    }
  };

  return isModal ? (
    <div className="w-full h-full bg-black bg-opacity-80 fixed flex justify-center items-center p-2">
      <div className="max-w-[600px] w-full bg-slate-200 rounded shadow-md p-2">
        <h2 className="text-2xl uppercase text-center font-bold">
          Update Note
        </h2>
        <form className="flex flex-col gap-2">
          {error && !updateModalData.title && (
            <p className="font-semibold px-2 text-red-500 capitalize  ">
              title is required*
            </p>
          )}
          <input
            value={title}
            onChange={(e) => {
              setUpdateModalData({ ...updateModalData, title: e.target.value });
            }}
            type="text"
            placeholder="Task Title"
            className="field"
          />
          {error && !updateModalData.desc && (
            <p className="font-semibold px-2 text-red-500 capitalize  ">
              description is required*
            </p>
          )}
          <textarea
            onChange={(e) => {
              setUpdateModalData({ ...updateModalData, desc: e.target.value });
            }}
            value={desc}
            className="field"
            placeholder="Task Description"
            id=""
            cols="30"
            rows="4"
          ></textarea>
          {error && !updateModalData.level && (
            <p className="font-semibold px-2 text-red-500 capitalize  ">
              level is required*
            </p>
          )}
          <select
            onChange={(e) => {
              setUpdateModalData({ ...updateModalData, level: e.target.value });
            }}
            value={level}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="none" disabled>
              Select an option
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="flex gap-2 justify-center">
            <button className="btn2 rounded" onClick={handdleUpdate}>
              save
            </button>
            <button
              className="btn1 rounded"
              onClick={() => {
                setModal(false);
              }}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default UpdateModal;
