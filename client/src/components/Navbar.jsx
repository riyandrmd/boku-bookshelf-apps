import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    useColorModeValue,
    Spacer,
    Text,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from 'react-icons/rx';

const Navbar = ({ email, btn, onClick }) => {
    const bg = useColorModeValue('#daadff', '#22162b')

    return (
        <Flex boxShadow='md' p={5} gap={2} alignItems='center' bg={bg}>
            <Button ref={btn} onClick={onClick} variant='ghost' size='sm'><RxHamburgerMenu size='24px' /></Button>
            <Heading bgGradient="linear(to-br, #7928CA, #FF0080)" bgClip='text' as='h2' size='md'>Boku Bookshelf</Heading>
            <Spacer />
            <Avatar size='sm' name={email} src='?' />
            <Text as='p' fontWeight='semibold'>{email}</Text>
        </Flex>
    )
}

export default Navbar