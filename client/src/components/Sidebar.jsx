import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Heading,
    VStack,
    Button,
    useColorMode,
    DrawerCloseButton,
    DrawerFooter
} from '@chakra-ui/react'

import { BiSolidMoon, BiSolidSun } from 'react-icons/bi'

import { Link } from 'react-router-dom'

const Sidebar = ({ btn, onClose, isOpen }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Drawer size='xs' placement='left' finalFocusRef={btn} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        <Heading bgGradient="linear(to-br, #7928CA, #FF0080)" bgClip='text' as='h2' size='md'>Boku Bookshelf</Heading>
                    </DrawerHeader>
                    <DrawerBody>
                        <VStack align='left'>
                            <Link to='/home' className='hover:font-semibold'>Home</Link>
                            <Link to='/home/addbook' className='hover:font-semibold'>Add New Book</Link>
                            <Link to='/' className='hover:font-semibold'>Log out</Link>
                        </VStack>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='ghost' size='sm' onClick={toggleColorMode}>
                            {colorMode === 'light' ? <BiSolidMoon /> : <BiSolidSun color='white' />}
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Sidebar