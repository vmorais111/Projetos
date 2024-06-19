import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './components/login.tsx'
import Home from './components/home.tsx'
import Cadastro from './components/cadastro.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element:<Login/>
  },
  {
    path:'/home',
    element:<Home/>
  },
  {
    path:'/cadastro',
    element:<Cadastro/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
