import { Box, Flex, Button, FormLabel } from "@chakra-ui/react";
import { useState } from "react";
import { Api } from "../components/Utils";
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { Link } from 'react-router-dom';

const AddNewBook = () => {
    const [newBook, setNewBook] = useState({
        title: "",
        year: 0,
        author: "",
        summary: "",
        publisher: "",
        pageCount: 0,
        readPage: 0,
        reading: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setNewBook((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    };

    const handleSave = async () => {
        try {
            await Api('books', "POST", newBook);
            alert("Book Saved!");
        } catch (error) {
            console.error("There is an error:", error);
            alert("An error occurred while saving the book.");
        }
    };

    return (
        <Flex pt="100px" width="100wh" height="80vh" alignItems="baseline" justify="center" wrap="wrap" gap="20px">
            <Box position='absolute' top='70px' left='20px' m={5}>
                <Link to='/home'>
                    <MdOutlineKeyboardBackspace size='30px' />
                </Link>
            </Box>

            <Box>
                <FormLabel>Title</FormLabel>
                <input
                    className="rounded border border-indigo-600 h-8 p-2 w-60 md:w-80"
                    type="text"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    placeholder="Name"
                />
                <FormLabel mt={3}>Author</FormLabel>
                <input
                    className="rounded border border-indigo-600 h-8 p-2 w-60 md:w-80"
                    type="text"
                    name="author"
                    value={newBook.author}
                    onChange={handleInputChange}
                    placeholder="Author"
                />
                <FormLabel mt={3}>Publisher</FormLabel>
                <input
                    className="rounded border border-indigo-600 h-8 p-2 w-60 md:w-80"
                    type="text"
                    name="publisher"
                    value={newBook.publisher}
                    onChange={handleInputChange}
                    placeholder="Publisher"
                />
                <FormLabel mt={4}>Year</FormLabel>
                <input
                    className="rounded border border-indigo-600 h-8 p-2 w-60 md:w-80"
                    type="number"
                    name="year"
                    value={newBook.year}
                    onChange={handleInputChange}
                    placeholder="Year"
                />
                <Box mt={5}>
                    <input
                        id="bordered-checkbox-1"
                        type="checkbox"
                        name="reading"
                        checked={newBook.reading}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded"
                    />
                    <label htmlFor="bordered-checkbox-1"> Reading ?</label>
                </Box>
            </Box>
            <Box>
                <FormLabel>Page Count</FormLabel>
                <input
                    className="rounded border border-indigo-600 h-8 p-2 w-60 md:w-80"
                    type="number"
                    name="pageCount"
                    value={newBook.pageCount}
                    onChange={handleInputChange}
                    placeholder="Page Count"
                />
                <FormLabel mt={2}>Read Page</FormLabel>
                <input
                    className="rounded border border-indigo-600 h-8 p-2 w-60 md:w-80"
                    type="number"
                    name="readPage"
                    value={newBook.readPage}
                    onChange={handleInputChange}
                    placeholder="Read Page"
                />
                <FormLabel mt={3}>Summary</FormLabel>
                <textarea
                    rows="4"
                    className="rounded border border-indigo-600 block p-2.5 w-60 md:w-80 text-sm"
                    name="summary"
                    value={newBook.summary}
                    onChange={handleInputChange}
                    placeholder="Write your thoughts here..."
                ></textarea>

                <Button
                    size="md"
                    bgGradient="linear(to-br, #7928CA, #FF0080)"
                    mt={6}
                    className="rounded h-8 p-2 w-60 md:w-80"
                    onClick={handleSave}
                >
                    Save
                </Button>
            </Box>
        </Flex>
    );
};

export default AddNewBook;
