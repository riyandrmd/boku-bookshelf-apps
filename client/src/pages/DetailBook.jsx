import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Api } from "../components/Utils";
import { Flex, Image, Text, Box, Heading, Button } from '@chakra-ui/react';
import img from '/book.jpg'
import { BsCheckCircle } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'

const DetailBook = () => {
    const { id } = useParams();
    const [detailbook, setDetailBook] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        Api('books/' + id)
            .then((book) => setDetailBook(book))
            .catch((err) => setError(err.message));
    }, []);

    const handleDelete = async () => {
        try {
            await Api('books/' + id, "DELETE");
            alert("Book Deleted!");
            navigate("/home")
        } catch (error) {
            console.error("There is an error:", error);
            alert("An error occurred while delete the book.");
        }
    };

    const book = detailbook.data;
    book && console.log(book[0].author)

    return (
        <>
            {
                book &&
                <Flex wrap='wrap' p='5' height='85vh' width='100%' alignItems='center' justifyContent='center' gap={50}>
                    <Box width='500px'>
                        <Image src={img} objectFit='contain' width='100%' />
                    </Box>
                    <Box p={10} alignItems='left'>
                        <Heading>{book[0].title}</Heading>
                        <Text>{book[0].author} {book[0].year}</Text>
                        <Heading mt={4} as='h4' size='sm'>Publisher : {book[0].publisher}</Heading>
                        <Heading mt={4} as='h4' size='sm'>Summary :</Heading>
                        <Text mb={5}>{book[0].summary}</Text>
                        {book[0].finished == 0 ?
                            <Text>last page read {book[0].readPage}, out of {book[0].pageCount} pages</Text> :
                            <Flex alignItems='center'> <BsCheckCircle /><Text>You have already read this book </Text></Flex>}
                        <Flex>
                            <Button variant='ghost' size='md' justifySelf='right'>
                                <FaEdit />
                            </Button>
                            <Button variant='ghost' size='md' justifySelf='right' onClick={() => handleDelete()}>
                                <AiFillDelete />
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
            }
        </>
    )
}

export default DetailBook