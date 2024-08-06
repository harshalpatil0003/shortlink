import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './index.css';
import Home from './views/Home/Home.js';
import Login from './views/login/Login.js';
import Signup from './views/signup/Signup.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router=createBrowserRouter([{
  path: '/',
  element: <Home />
},
{
  path: '/signin',
  element: <Login />
},
{
  path: '/signup',
  element: <Signup />
},
{
  path: '*',
  element:<h1>404 page not found</h1>
}
])
root.render(
  <RouterProvider router={router}/>
);
