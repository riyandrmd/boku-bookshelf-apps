import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {BiSolidMoon, BiSolidSun} from 'react-icons/bi';
const Register = () => {
  const bg = useColorModeValue('#e3dcf5', '#540694')
  const { colorMode, toggleColorMode } = useColorMode();

  const [passCheck, setPassCheck] = useState();
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleRegister = async () => {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      navigate("/");
    } else {
      console.error(response.body);
      console.log(register);
    }
  };
  return (
    <Flex
      width="100wh"
      height="100vh"
      align="center"
      justifyContent="center"
    >
      <Box position='absolute' top='0' right='0' m={5}>
        <Button variant='ghost' size='sm' onClick={toggleColorMode}>
          {colorMode === 'light' ? <BiSolidMoon /> : <BiSolidSun color='white' />}
        </Button>
      </Box>
      <Card bg={bg} py={4} px={4} mt={[0, -50]} borderRadius={8}>
        <Box>
          <Heading
            as="p"
            size="md"
            fontWeight="semibold"
            className="text-center">
            Boku <br />
            Bookshelf
          </Heading>
        </Box>
        <Box my={4} textAlign="left">
          <Heading as="h2" size="sm">
            Sign in
          </Heading>
          <form>
            <FormControl isRequired>
              <FormLabel mt={2}>Email</FormLabel>
              <input
                className="rounded h-8 p-2 w-60 md:w-80  "
                type="email"
                placeholder="youmust@gmail.com"
                onChange={(e) => {
                  setRegister({ ...register, email: e.target.value });
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel mt={2}>Username</FormLabel>
              <input
                className="rounded h-8 p-2 w-60 md:w-80  "
                type="email"
                placeholder="youmust345"
                onChange={(e) => {
                  setRegister({ ...register, username: e.target.value });
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel mt={2}>Password</FormLabel>
              <input
                className="rounded h-8 p-2 w-60 md:w-80 border-1"
                type="password"
                placeholder="**********"
                onChange={(e) => {
                  setRegister({ ...register, password: e.target.value });
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel mt={2}>Confirm Password</FormLabel>
              <input
                className="rounded h-8 p-2 w-60 md:w-80 border-1"
                type="password"
                placeholder="**********"
                onChange={(e) => {
                  setPassCheck(e.target.value);
                }}
              />
            </FormControl>
            <Text as="p" className="text-xs mt-2 text-center">
              Already have account ?
              <Link to='/' bg='red.200'><b> Login</b></Link>
            </Text>
            <Button
              size="md"
              mt={6}
              bgGradient="linear(to-br, #7928CA, #FF0080)" bgClip='border-box'
              className="rounded h-8 p-2 w-60 md:w-80"
              onClick={() => {
                if (register.password == passCheck) {
                  handleRegister();
                } else {
                  alert("password not match")
                }
              }}>
              Sign In
            </Button>
          </form>
        </Box>
      </Card>
    </Flex>
  );
};

export default Register;
