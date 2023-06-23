import React from 'react';

import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import ProductPage from "../pages/ProductPage";
import ProductCard from "../pages/ProductCard";
import SuccessPage from "../pages/SuccessPage";
import About from '../pages/About';
import Payment from '../pages/Payment';
import Faq from '../pages/Faq';
import MainLayout from './MainLayout';
import UserLogIn from '../pages/UserLogIn';
import Registration from '../pages/Registration';
import { AuthContext } from '../context';
import AuthPage from '../pages/AuthPage';
import axios from 'axios';

const AppRoutes = () => {
    const { isAuth, isLoading, adminMode } = React.useContext(AuthContext);
    const [types, setTypes] = React.useState([]);

    React.useEffect(() => {
        axios.get(`http://localhost:3001/api/type`)
            .then((res) => {
                setTypes(res.data);
            });
    }, []);

    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                {isAuth
                    ?
                    <Route path="auth" element={<AuthPage />} />  
                    :
                    <Route path="login" element={<UserLogIn />} /> 
                }
                <Route path="registration" element={<Registration />} />   
                <Route path="catalog" element={<Catalog />} />
                {types.map((type) => 
                    <Route key={type.id} value={type} path={`${type}/product`} element={<ProductPage type={type} />} />                   
                )}  

                {types.map((type) =>   
                    <Route key={type} value={type} path={`product/:id`} element={<ProductCard obj={type} />} />                                                    
                )}  
                
                <Route path="cart" element={<Cart arr={types} />} />
                <Route path="success" element={<SuccessPage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="about" element={<About />} />
                <Route path="payment&delivery" element={<Payment />} />
                <Route path="faq" element={<Faq/>} />            
            </Route>

        </Routes>          

    );
};

export default AppRoutes;