import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from "./store";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </React.StrictMode>,
)
