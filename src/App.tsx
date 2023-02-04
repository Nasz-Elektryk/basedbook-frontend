import React from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from './Sites/auth/Login/Login';
import Auth from './Sites/auth/Auth';
import Register from './Sites/auth/Register/Register';
import Main from './Sites/main/Main';
import Homepage from './Sites/main/Homepage/Homepage';
import Spotted from './Sites/main/Spotted/Spotted';

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  }, 
  {
    path: "/auth/login",
    element: <Login />
  },
  {
    path: "/auth/signup",
    element: <Register />
  },
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Homepage />
      },
      {
        path: "spotted",
        element: <Spotted />
      },
    ]
  }
]);



function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
  
}

export default App;
