import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './index.css';
import Home from './views/Home/Home.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router=createBrowserRouter([{
  path: '/',
  element: <Home />
}])
root.render(
  <RouterProvider router={router}/>
);
