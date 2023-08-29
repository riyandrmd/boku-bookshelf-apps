import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Heading,
    VStack,
    Button,
    useColorMode
} from '@chakra-ui/react'

import { Link } from 'react-router-dom'

const Sidebar = ({ btn, onClose, isOpen }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Drawer size='xs' placement='left' finalFocusRef={btn} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>
                        <Heading bgGradient="linear(to-br, #7928CA, #FF0080)" bgClip='text' as='h2' size='md'>Boku Bookshelf</Heading>
                    </DrawerHeader>
                    <DrawerBody>
                        <VStack align='left'>
                            <Link to='/home' className='hover:font-semibold'>Home</Link>
                            <Link to='/home/addbook' className='hover:font-semibold'>Add New Book</Link>
                            <Link to='/' className='hover:font-semibold'>Log out</Link>
                            <Button onClick={toggleColorMode}>
                                Theme {colorMode === 'light' ? 'Dark' : 'Light'}
                            </Button>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Sidebar