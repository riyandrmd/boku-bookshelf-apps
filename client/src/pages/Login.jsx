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
  useColorModeValue
} from "@chakra-ui/react";
import{BiSolidMoon, BiSolidSun } from 'react-icons/bi'
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const bg = useColorModeValue('#e3dcf5', '#540694')
  const { colorMode, toggleColorMode } = useColorMode();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.jwt_token);
      navigate("/home");
    } else {
      alert("incorrect email or password");
    }
  };
  return (
    <Flex
      width="100wh"
      height="100vh"
      align="center"
      justifyContent="center"
    >
      <Box position='absolute' top='0' right='0'm={5}>
        <Button variant='ghost' size='sm' onClick={toggleColorMode}>
          {colorMode === 'light' ? <BiSolidMoon /> : <BiSolidSun color='white' />}
        </Button>
      </Box>
      <Card bg={bg} shadow='xl' py={4} px={4} mt={[0, -50]} borderRadius={8}>
        <Box>
          <Heading
            as="p"
            size="md"
            fontWeight="semibold"
            className="text-center"
          >
            Boku <br />
            Bookshelf
          </Heading>
        </Box>
        <Box my={4} textAlign="left">
          <Heading as="h2" size="sm">
            Log in
          </Heading>
          <form>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <input
                className="rounded h-8 p-2 w-60 md:w-80"
                type="email"
                placeholder="youmust@gmail.com"
                onChange={(e) => {
                  setLogin({ ...login, email: e.target.value });
                }}
              />
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Password</FormLabel>
              <input
                className="rounded h-8 p-2 w-60 md:w-80  "
                type="password"
                placeholder="**********"
                onChange={(e) => {
                  setLogin({ ...login, password: e.target.value });
                }}
              />
            </FormControl>
            <Text as="p" className="text-xs mt-2 text-center">
              Don't have any account ?
              <Link to="/register" bg="red.200">
                <b> Sign In</b>
              </Link>
            </Text>
            <Button
              size="md"
              mt={6}
              className="rounded h-8 p-2 w-60 md:w-80"
              bgGradient="linear(to-br, #7928CA, #FF0080)" bgClip='border-box'
              onClick={() => handleLogin()}
            >
              Login
            </Button>
          </form>
        </Box>
      </Card>
    </Flex>
  );
};

export default Login;
