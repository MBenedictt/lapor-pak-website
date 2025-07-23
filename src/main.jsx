// main.jsx

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';

// Import komponen halaman dan layout
import RootLayout from './pages/RootLayout'; // <-- IMPORT LAYOUT BARU
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import DetailPage from './pages/DetailPage';
import CreatePage from './pages/CreatePage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "report",
        element: <ReportPage />,
      },
      {
        path: "report/detail",
        element: <DetailPage />,
      },
      {
        path: "create",
        element: <CreatePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);