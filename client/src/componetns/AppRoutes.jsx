import React from 'react';

import { Routes, Route } from "react-router-dom";

import { check } from '../http/userAPI';
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
import CreateAccount from '../pages/CreateAccount';
import { AuthContext } from '../context';
import UserPage from '../pages/UserPage';
import AdminPage from '../pages/AdminPage';
import LashesCard from '../pages/LashesCard';

const AppRoutes = () => {
    const { user } = React.useContext(AuthContext);
    const arr = ['pestanas', 'colas', 'liquidosEPreparacao', 'pincas', 'passosParaLift', 'liquidosEHydratacao', 'moldes', 'passosParaBrowLift', 'hydratacao', 'coloracao', 'acessorios', 'luz'];
    const pestanasGroup = ['pestanasMaximova', 'pestanasSculptorLash', 'pestanasLamiC', 'pestanasLashSecret', 'pestanasVivienne', 'pestanasThuya', 'pestanasMia'];
    const [isLoading, setLoading] = React.useState(true);  

    React.useEffect(() => {
        check().then(data => {
        user.setUser(true);
        user.setIsAuth(true);
        }).finally(() => setLoading(false))
    }, []);  

    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>

                <Route path="" element={<Home />} />
                {user.isAuth
                    ?
                    <Route path="auth" element={<UserPage />} />  
                    :
                    <Route path="login" element={<UserLogIn />} /> 
                }
                {user.isAuth
                    ?
                    <Route path="admin" element={<AdminPage />} />  
                    :
                    <Route path="login" element={<UserLogIn />} /> 
                }
                <Route path="create-account" element={<CreateAccount />} />   
                <Route path="catalog" element={<Catalog />} />
                {arr.map((obj) => 
                    <Route key={obj} value={obj} path={`${obj}`} element={<ProductPage arrItem={obj} />} />                   
                )}  

                {arr.map((obj) =>   
                    <Route key={obj} value={obj} path={`api/product/:id`} element={<ProductCard obj={obj} />} />                                                    
                )}  

                {pestanasGroup.map((group) => 
                    <Route key={group} value={group} path={`${group}/:id`} element={<LashesCard obj={group} />} /> 
                )}
                
                <Route path="cart" element={<Cart arr={arr} />} />
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