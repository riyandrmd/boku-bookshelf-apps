import React from 'react'
import { Box, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
    const bg = useColorModeValue('#daadff', '#22162b')

    return (
        <Box as='footer' bg={bg} >
            <p> &copy;Riyanda 2022</p>
        </Box >
    )
}

export default Footer