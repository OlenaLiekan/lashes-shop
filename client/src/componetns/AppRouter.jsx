/*import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import MainLayout from './MainLayout';

const AppRouter = () => {
    const isAuth = false;
    return (
        <Routes>
            <Route path='/' element={MainLayout}>
                {authRoutes.map(({ path, Component }) => 
                    <Route key={path} path={path} element={<Component/>} exact/>
                )}
                {publicRoutes.map(({ path, Component }) => 
                    <Route key={path} path={path} element={<Component/>} exact/>
                )}               
            </Route>
        </Routes>
    );
};

export default AppRouter;*/