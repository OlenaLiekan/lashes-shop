import AdminPage from "./pages/AdminPage"
import Cart from "./pages/Cart"
import Catalog from "./pages/Catalog"
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import ProductCard from "./pages/ProductCard"
import { ADMIN_ROUTE, CART_ROUTE, CATALOG_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    }
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
        {
        path: CATALOG_ROUTE,
        Component: Catalog
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductCard
    },
    {
        path: CART_ROUTE,
        Component: Cart
    }
]