import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Api } from "../components/Utils";
import { Flex, Image ,Text, Box, Heading, Spacer} from '@chakra-ui/react';
import img from '/book.jpg'

const DetailBook = () => {
    const { id } = useParams();
    const [detailbook, setDetailBook] = useState({});

    useEffect(() => {
        Api('books/' + id)
            .then((book) => setDetailBook(book))
            .catch((err) => setError(err.message));
    }, []);


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
                        <Heading mt={8} as='h4' size='sm'>Desciption :</Heading>
                        <Text>{book[0].summary}</Text>
                    </Box>
                </Flex>
            }
        </>
    )
}

export default DetailBook