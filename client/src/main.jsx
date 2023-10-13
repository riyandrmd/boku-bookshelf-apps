import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AddNewBook from './pages/AddBook';
import Books from './pages/Books.jsx';
import theme from './components/Theme.jsx'
import DetailBook from './pages/DetailBook.jsx'
import UpdateBook from './pages/Updatebook.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='home' element={<Home />}>
        <Route index element={<Books />} />
        <Route path='addbook' element={<AddNewBook />} />
        <Route path='detailbook/:id' element={<DetailBook />} />
        <Route path='updatebook/:id' element={<UpdateBook />} />
      </Route>
    </Route>
  )
)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </RouterProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
