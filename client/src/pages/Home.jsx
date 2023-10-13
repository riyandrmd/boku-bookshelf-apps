import { useDisclosure } from "@chakra-ui/react";
import { useState, useEffect, useRef, createContext } from "react";
import { Api } from "../components/Utils";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export const dataContext = createContext();

const Home = () => {
  const [books, setBooks] = useState({});
  const [thisBooks, setThisBooks] = useState({});
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    Api('user/books')
      .then((book) => setBooks(book))
      .catch((err) => setError(err.message));
  }, []);

  const userLogin = books.user;

  return (
    <div className="container">
      {
        userLogin &&
          <dataContext.Provider value={{ books, thisBooks, setThisBooks }}>
            <Navbar email={userLogin.email} btn={btnRef} onClick={onOpen}></Navbar>
            <Outlet />
            <Footer/>
          </dataContext.Provider>
      }
      <Sidebar btn={btnRef} onClose={onClose} isOpen={isOpen} />
    </div>
  )
}

export default Home