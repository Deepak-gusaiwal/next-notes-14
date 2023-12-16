"use client";
import Link from "next/link";
import { useUserContextProvider } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { deleteNote } from "../services/noteService";
import { useNotesContextProvider } from "../context/NotesContext";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { logoutUser } from "../services/userService";

//1. logout and login buttons component for header
export const UserLoginSignupBtns = () => {
  const { user, setUser } = useUserContextProvider();
  const router = useRouter();
  const logoutHanddler = async () => {
    // call logout api
    try {
      const data =await logoutUser();
      if (data.success) {
        setUser({});
        toast.success(data.msg);
        router.push("/login");
        console.log("logout user data is", data);
      } else {
        throw new Error("something went wrong while logout! refresh the page");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {user._id ? (
        <button onClick={logoutHanddler} className="btn2">
          logout
        </button>
      ) : (
        <>
          <Link className="btn1" href="/signup">
            signup
          </Link>
          <Link className="btn2" href="/login">
            login
          </Link>
        </>
      )}
    </>
  );
};
//2. protected rouets menu links for header
export const ProtectedMenuLinks = () => {
  const { user } = useUserContextProvider();
  return (
    <>
      {user._id && (
        <>
          <Link href="/">Home</Link>
          <Link href="/notes">Notes</Link>
        </>
      )}
    </>
  );
};
//3. header logo component
export const LogoComp = () => {
  const { user } = useUserContextProvider();
  return (
    <>
      <Link
        className="text-[max(2.5vw,1.5rem)] font-semibold uppercase "
        href="/"
      >
        {user.name ? user.name : "LOGO"}
      </Link>
    </>
  );
};
export const TodoButtons = ({ id, title, desc, level }) => {
  const { loading, setLoading } = useUserContextProvider();
  const { notes, setNotes, setModal, updateModalData, setUpdateModalData } =
    useNotesContextProvider();

  const handdleDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
    });
    if (!isConfirmed) return;
    setLoading({ ...loading, deleteNote: true });
    try {
      const data = await deleteNote(id);
      if (data.success) {
        setLoading({ ...loading, deleteNote: false });
        await Swal.fire({
          title: "note deleted",
          text: "your note has been succesffuly deleted",
          icon: "success",
          showCancelButton: true,
        });
        toast.success(data.msg);
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
      } else {
        setLoading({ ...loading, deleteNote: false });
        toast.error(data.msg);
      }
    } catch (error) {
      setLoading({ ...loading, deleteNote: false });
      toast.error(error.message);
    }
  };

  const handdleUpdate = async () => {
    console.log("updating the note");
    setModal(true);
    setUpdateModalData({ ...updateModalData, title, desc, level, id });
  };
  return (
    <>
      <button className="btn1 flex gap-1 rounded p-1" onClick={handdleDelete}>
        <MdDeleteForever size={"1.5rem"} />
      </button>
      <button className="btn2 rounded p-1" onClick={handdleUpdate}>
        <FaEdit size={"1.5rem"} />
      </button>
    </>
  );
};
