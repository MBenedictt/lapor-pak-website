import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  // {
  //   path: "/report",
  //   element: <NamaPagenya />
  // },
  // {
  //   path: "/report/detail",
  //   element: <NamaPagenya />
  // },
  // {
  //   path: "/submit",
  //   element: <NamaPagenya />
  // },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
