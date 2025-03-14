import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as loaderMenu } from "./features/menu/Menu";
import Order, { loader as loaderOrder } from "./features/order/Order";

import Cart from "./features/cart/Cart";
import CreateOrder , {action as createOrderAction} from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";


const childrenRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/menu",
    element: <Menu />,
    loader : loaderMenu,
    errorElement : <Error />
  },

  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/order/new",
    element: <CreateOrder />,
    action : createOrderAction ,// 👈 Handles form submissions
    errorElement : <Error />

  },
  {
    path: "/order/:orderId",
    element: <Order />,
    loader : loaderOrder,
    errorElement : <Error />

  },
];

const appLayout = {
  element: <AppLayout />,
  children: childrenRoutes,
  
};

const router = createBrowserRouter([appLayout]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
