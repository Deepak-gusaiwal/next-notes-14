import { axiosCreator } from "@/axiosCreator/axiosCreator";

export const addNote = async (noteDetail) => {
  const { data } = await axiosCreator.post("/api/notes", noteDetail);
  return data;
};

export const fetchNotes = async (userId) => {
  const { data } = await axiosCreator.get(`/api/users/${userId}/notes`);
  return data;
};

export const deleteNote = async (id) => {
  const { data } = await axiosCreator.delete(`/api/notes/${id}`);
  return data;
};

export const updateNote = async (id, noteDetail) => {
  const { data } = await axiosCreator.put(`/api/notes/${id}`, noteDetail);
  return data;
};
