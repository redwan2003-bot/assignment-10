import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import AuthProvider from './providers/AuthProvider.jsx';
import ThemeProvider from './providers/ThemeProvider.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

// Pages
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AllMovies from './pages/AllMovies.jsx';
import AddMovie from './pages/AddMovie.jsx';
import MyCollection from './pages/MyCollection.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import UpdateMovie from './pages/UpdateMovie.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <AllMovies />,
      },
      {
        path: "/movies/add",
        element: <PrivateRoute><AddMovie /></PrivateRoute>,
      },
      {
        path: "/movies/my-collection",
        element: <PrivateRoute><MyCollection /></PrivateRoute>,
      },
      {
        path: "/movies/:id",
        element: <PrivateRoute><MovieDetails /></PrivateRoute>,
      },
      {
        path: "/movies/update/:id",
        element: <PrivateRoute><UpdateMovie /></PrivateRoute>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
