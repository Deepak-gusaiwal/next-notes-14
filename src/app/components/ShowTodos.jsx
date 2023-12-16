"use client";
import React from "react";
import { TodoItem } from "./Server";
import { useNotesContextProvider } from "../context/NotesContext";
import { useUserContextProvider } from "../context/UserContext";

const ShowTodos = () => {
  const { notes } = useNotesContextProvider();
  const { loading } = useUserContextProvider();
  return (
    <>
      <h2 className="font-semibold capitalize">
        your notes {notes.length}
        <p className="text-center font-bold capitalize text-red-400">
          {loading.deleteNote && "deleting..."}
          {loading.showNotes && "loading notes..."}
        </p>
      </h2>
      {notes.length > 0 ? (
        <div className=" grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-4">
          {notes.length > 0
            ? notes.map((note) => {
                return (
                  <TodoItem
                    key={note._id}
                    noteId={note._id}
                    title={note.title}
                    desc={note.desc}
                    level={note.level}
                  />
                );
              })
            : null}
        </div>
      ) : (
        <p className="text-center ">you have no notes</p>
      )}
    </>
  );
};

export default ShowTodos;
