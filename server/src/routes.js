import {
    addBooks,
    getAllBooks,
    getAllUserBooks,
    getByIdBooks,
    updateBooks,
    deleteBooks,
    loginUser,
    createUser,
    getAllUser,
} from "./handler.js";

const routes = [
    {
      method: "GET",
      path: "/books",
      handler: getAllBooks,
    },
    {
      method: "GET",
      path: "/user/books",
      handler: getAllUserBooks,
    },
    {
      method: "POST",
      path: "/books",
      handler: addBooks,
    },
    {
      method: "GET",
      path: "/books/{bookId}",
      handler: getByIdBooks,
    },
    {
      method: "PUT",
      path: "/books/{bookId}",
      handler: updateBooks,
    },
    {
      method: "DELETE",
      path: "/books/{bookId}",
      handler: deleteBooks,
    },
    {
      method: "POST",
      path : "/login",
      config : {auth : false},
      handler : loginUser,
    },
    {
      method: "POST",
      path : "/register",
      config : {auth : false},
      handler : createUser,
    },
    {
      method: "GET",
      path : "/user",
      config : {auth : false},
      handler : getAllUser,
    }
];

export default routes;