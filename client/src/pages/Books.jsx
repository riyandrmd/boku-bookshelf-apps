import { useContext, useState } from 'react'
import { dataContext } from './Home'
import { BiCheckDouble } from 'react-icons/bi'
import img from '/book.jpg'
import { Card, Flex, Image, Text, Tooltip, useColorModeValue, Box } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const Books = () => {


    const bg = useColorModeValue('#daadff', '#540694')
    const color = useColorModeValue('gray.400', 'gray.600')
    const { books } = useContext(dataContext)
    const [keyword, setKeyword] = useState("");
    const allBook = books.data;
    
    
   const searchBook = allBook.filter((sBook) => sBook.title.toLowerCase().includes(keyword.toLowerCase()))

    return (
        <Box width='100wh'>
            <Box paddingX={10} paddingY={2}>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="rounded border border-indigo-600 h-8 p-2 w-60"
                    placeholder='search book'
                />
            </Box>
            <Flex p={10} justifyContent='start' wrap='wrap' gap={5}>
                {
                    searchBook?.map((book) => {
                        return (
                            <Link key={book.id} to={`detailbook/${book.id}`}>
                                <Card w={{ base: '120px', sm: '140px', md: '160px', lg: '180px' }} bg={bg} shadow='xl' p={2} overflow='auto' gap='1px' _hover={{ bg: color }}>
                                    <Image src={img} objectFit='contain' width='100%' />
                                    <Tooltip hasArrow label={book.title}>
                                        <Text fontSize='sm' fontWeight='semibold' isTruncated>{book.title}</Text>
                                    </Tooltip>
                                    <Text fontSize='sm'>{book.author}</Text>
                                    <Flex justifyContent='space-between' alignItems='center'>
                                        <Text fontSize='sm'>{book.year}</Text>
                                        {book.finished ? <BiCheckDouble /> : "-"}
                                    </Flex>
                                </Card>
                            </Link>
                        )
                    })
                }
            </Flex>
        </Box>
    )
}

export default Books