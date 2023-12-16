"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchNotes } from "../services/noteService";
import { useUserContextProvider } from "./UserContext";
import { toast } from "react-toastify";

const notesContext = createContext();

export const NotesContextProvider = ({ children }) => {
  const { user, loading, setLoading } = useUserContextProvider();
  const [notes, setNotes] = useState([]);
  const [isModal, setModal] = useState(false);
  const [updateModalData, setUpdateModalData] = useState({});

  const getUserNotes = async () => {
    setLoading({ ...loading, showNotes: true });
    if (!user._id) return;
    try {
      const data = await fetchNotes(user._id);
      data.success ? setNotes([...data.result]) : toast.error(data.msg);
      setLoading({ ...loading, showNotes: false });
    } catch (error) {
      setLoading({ ...loading, showNotes: false });
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getUserNotes();
  }, [user]);
  return (
    <notesContext.Provider
      value={{ notes, getUserNotes, setNotes, isModal, setModal,updateModalData,setUpdateModalData }}
    >
      {children}
    </notesContext.Provider>
  );
};

export const useNotesContextProvider = () => {
  return useContext(notesContext);
};
