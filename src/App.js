import "./index.css";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import About from "./components/About";
import BookListing from "./components/BookListing";
import Page404 from "./components/Page404";
import Profile from "./components/Profile";
import UserContext from "./utils/UserContext";
import { useContext, useEffect, useState } from "react";
import Addbook from "./components/Addbook";
import UpdateBook from "./components/UpdateBook";
import Signup from "./components/Signup";

const AppLayout = ({ userData }) => {
  const [user, setUser] = useState();
  //const {loggedInUser} = useContext(UserContext);

  useEffect(() => {
    setUser(JSON.parse(userData)?.user?.displayName);
  }, []);

  return (
    <>
      <UserContext.Provider value={{ loggedInUser: user }}>
        <Header />
        <Outlet />
      </UserContext.Provider>
    </>
  );
};

const PrivateRoute = () => {
  const isAuth = localStorage.getItem("bUApp");
  return (
    <>
      {isAuth != null ? (
        <AppLayout userData={isAuth} />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <BookListing />,
      },
      {
        path: "/books",
        element: <BookListing />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "*",
        element: <Page404 />,
      },
      {
        path:"/addbook",
        element:<Addbook/>
      },
      {
        path:"/updatebook/:id",
        element:<UpdateBook/>
      }
      // {
      //   path: '/login',
      //   element: <Profile />
      // }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path:"/signup",
    element:<Signup/>
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
