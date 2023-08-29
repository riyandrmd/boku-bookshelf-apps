import { nanoid } from "nanoid";
import conn from "./connection.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

export const addBooks = async (request, h) => {
  try {
    const {
      title,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;

    if (!title || title === "" || title === null) {
      const response = h.response({
        status: "fail",
        message: "Failed to add book. Please write the title of the book",
      });
      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: "fail",
        message:
          "Failed to add book. readPage cannot be greater than pageCount",
      });
      response.code(400);
      return response;
    }
    const decoded = request.auth.credentials;
    const email = decoded.email;

    const getUser = await conn.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    console.log(getUser[0].id);

    const userId = getUser[0].id;
    const id = nanoid(8);
    const insertedAt = new Date().toLocaleString("id-ID");
    const updatedAt = insertedAt;

    const isFinished = (pageCount, readPage) =>
      pageCount == readPage ? true : false;
    const finished = isFinished(pageCount, readPage);

    const insertQuery = `
    INSERT INTO books
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await conn.query(insertQuery, [
      id,
      title,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
      userId,
    ]);

    if (result.affectedRows > 0) {
      const response = h.response({
        status: "success",
        message: "Book added successfully",
      });
      response.code(200);
      return response;
    } else {
      const response = h.response({
        status: "fail",
        message: "Failed to add book",
      });
      response.code(400);
      return response;
    }
  } catch (error) {
    console.log("Error adding book:", error);
    const response = h.response({
      status: "error",
      message: "There was an error adding the book",
    });
    response.code(500);
    return response;
  }
};

export const getAllBooks = async (request, h) => {
  try {
    const data = await conn.query("SELECT * FROM books");
    const response = h.response({
      status: "success",
      data,
    });

    response.code(200);
    return response;
  } catch (error) {
    console.log("Error while fetching book data:", error);
    return h
      .response({
        status: "error",
        message: "An error occurred while fetching book data",
      })
      .code(500);
  }
};

export const getAllUserBooks = async (request, h) => {
  try {
    const decoded = request.auth.credentials;
    const email = decoded.email;

    const getUserId = await conn.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    const userId = getUserId[0].id;
    const data = await conn.query("SELECT * FROM books WHERE userId = ?", [
      userId,
    ]);

    const response = h.response({
      user: decoded,
      status: "success",
      data,
    });

    response.code(200);
    return response;
  } catch (error) {
    console.log("Error while fetching book data:", error);
    return h
      .response({
        status: "error",
        message: "An error occurred while fetching Book data",
      })
      .code(500);
  }
};

export const getByIdBooks = async (request, h) => {
  try {
    const { bookId } = request.params;
    const getById = `SELECT * FROM books WHERE id = ?`;
    const data = await conn.query(getById, [bookId]);

    if (data.length > 0) {
      const response = h.response({
        status: "success",
        data,
      });
      response.code(200);
      return response;
    } else {
      const response = h.response({
        status: "fail",
        message: "Book not found",
      });
      response.code(404);
      return response;
    }
  } catch (error) {
    console.log("Error while fetching book data:", error);
    return h
      .response({
        status: "error",
        message: "An error occurred while fetching Book data",
      })
      .code(500);
  }
};

export const updateBooks = async (request, h) => {
  try {
    const { bookId } = request.params;
    const {
      title,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;

    if (readPage > pageCount) {
      const response = h.response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      });
      response.code(400);
      return response;
    }

    const isFinished = (pageCount, readPage) =>
      pageCount == readPage ? true : false;
    const finished = isFinished(pageCount, readPage);
    const updatedAt = new Date().toLocaleString("id-ID");
    const updateQuery = `
      UPDATE books
      SET title = ?, year = ?, author = ?, summary = ?, publisher = ?, pageCount = ?, readPage = ?, finished = ?, reading = ?, updatedAt = ?
      WHERE id = ?
    `;

    const result = await conn.query(updateQuery, [
      title,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
      bookId,
    ]);

    if (result.affectedRows > 0) {
      const response = h.response({
        status: "success",
        message: "Book updated",
      });
      response.code(200);
      return response;
    } else {
      const response = h.response({
        status: "fail",
        message: "Book not found",
      });
      response.code(404);
      return response;
    }
  } catch (error) {
    console.error("Error while updating the book:", error);
    const response = h.response({
      status: "error",
      message: "An error occurred while updating the book",
    });
    response.code(500);
    return response;
  }
};

export const deleteBooks = async (request, h) => {
  const { bookId } = request.params;
  try {
    const deleteQuery = `DELETE FROM books WHERE id = ? `;
    const result = await conn.query(deleteQuery, [bookId]);

    if (result.affectedRows > 0) {
      return {
        status: "success",
        message: "Book deleted successfully",
      };
    } else {
      const response = h.response({
        status: "fail",
        message: "Book not found",
      });
      response.code(404);
      return response;
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    const response = h.response({
      status: "error",
      message: "There was an error deleting the book",
    });
    response.code(500);
    return response;
  }
};

export const loginUser = async (request, h) => {
  try {
    const { email, password } = request.payload;
    const user = await conn.query("SELECT * FROM users WHERE email = ?", [email]);

    if (user.length > 0) {
      const hashedPasswordFromDB = user[0].password;

      const passwordMatch = await bcrypt.compare(
        password,
        hashedPasswordFromDB
      );

      console.log(passwordMatch);

      if (passwordMatch) {
        const token = jwt.sign({ email: email, password: hashedPasswordFromDB }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });

        h.state('token', token);
        const response = h.response({
          jwt_token: token,
        });

        response.code(200);
        return response;
      }
    }

    const response = h.response({
      status: "fail",
      message: "Incorrect username or Password ",
    });
    response.code(400);
    return response;
  } catch (error) {
    console.error("Error processing account", error);
    const response = h.response({
      status: "error",
      message: "An error occurred while processing the account",
    });
    response.code(500);
    return response;
  }
};

export const createUser = async (request, h) => {
  try {
    const { email, username, password } = request.payload;
    const id = nanoid(8);
    const hashPassword = await bcrypt.hash(password, 10);
    const insertQuery = `INSERT INTO users
    VALUES (?, ?, ?, ?)`;

    const result = await conn.query(insertQuery, [
      id,
      username,
      email,
      hashPassword,
    ]);

    if (result.affectedRows > 0) {
      const response = h.response({
        status: "success",
        message: "Account created successfully",
      });
      response.code(200);
      return response;
    } else {
      const response = h.response({
        status: "fail",
        message: "Failed to create account",
      });
      response.code(400);
      return response;
    }
  } catch (error) {
    console.error("Error while creating account:", error);
    const response = h.response({
      status: "error",
      message: "An error occurred while creating the account",
    });
    response.code(500);
    return response;
  }
};

export const getAllUser = async (request, h) => {
  try {
    const data = await conn.query("SELECT * FROM users");
    const response = h.response({
      status: "success",
      data,
    });

    response.code(200);
    return response;
  } catch (error) {
    console.log("Error while fetching user data:", error);
    return h
      .response({
        status: "error",
        message: "An error occurred while fetching user data",
      })
      .code(500);
  }
};
