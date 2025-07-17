import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import DetailPage from './pages/DetailPage';
import CreatePage from './pages/CreatePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/report",
    element: <ReportPage />
  },
  {
    path: "/report/detail",
    element: <DetailPage />
  },
  {
    path: "/create",
    element: <CreatePage />
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
