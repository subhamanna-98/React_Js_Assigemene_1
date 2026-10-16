import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Product from "../pages/Product";
import NotFoundPages from "../pages/NotFoundPages";
import Register from "../pages/auth/Register";
import Wraper from "../Layout/Wraper";
import ProductById from "../pages/ProductById";

const Routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Wraper />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "product/:id",
        element: <ProductById />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPages />,
  },
]);

export default Routes;
