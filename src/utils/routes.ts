import { RouteProps } from "react-router-dom";
import Home from "../pages/home/Home";
import Shop from "../pages/shop/Shop";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Wishlist from "../pages/wishlist/Wishlist";
import Account from "../pages/account/Account";
import OrderSummary from "../pages/checkout/OrderSummary";
import OrderSuccess from "../pages/checkout/OrderSuccess";
import OrderCancel from "../pages/checkout/OrderCancel";
import OrderDetails from "../pages/account/OrderDetails";

const routes: RouteProps[] = [
    {
        path: '/',
        Component: Home
    },
    {
        path: '/login',
        Component: Login
    },
    {
        path: '/register',
        Component: Register
    },
    {
        path: '/shop',
        Component: Shop
    },
    {
        path: '/about',
        Component: About
    },
    {
        path: '/contact',
        Component: Contact
    },
    {
        path: '/wishlist',
        Component: Wishlist
    },
    {
        path: '/account',
        Component: Account
    },
    {
        path: '/cart',
        Component: Cart
    },
    {
        path: '/checkout',
        Component: Checkout
    },
    {
        path: '/checkout/order-summary',
        Component: OrderSummary
    },
    {
        path: '/checkout/order-success',
        Component: OrderSuccess
    },
    {
        path: '/checkout/order-cancel',
        Component: OrderCancel
    },
    {
        path: '/order-details/:orderId',
        Component: OrderDetails
    }
]

export default routes