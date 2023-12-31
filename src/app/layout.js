import Header from "./components/Header";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "This is Todo App",
  description: "Generated by This is Todo App",
};
import { UserContextProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import { NotesContextProvider } from "./context/NotesContext";
import UpdateModal from "./components/UpdateModal";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserContextProvider>
          <NotesContextProvider>
            <ToastContainer />
            <Header />
            <UpdateModal/>
            {children}
          </NotesContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
