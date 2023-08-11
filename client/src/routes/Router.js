import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import RecoverPasswordPage from '../pages/RecoverPasswordPage/RecoverPasswordPage';
import HomePage from '../pages/HomePage/HomePage';

const Router = ({ accessButton, setAccessButton }) => {
  return (
    <BrowserRouter>
        <Routes>
            <Route
                path='/'
                element={
                    <LoginPage
                        accessButton={accessButton}
                        setAccessButton={setAccessButton}
                    />
                }
            />            

            <Route
                path='/cadastro'
                element={
                    <SignUpPage
                        accessButton={accessButton}
                        setAccessButton={setAccessButton}
                    />
                }
            />

            <Route
                path='/recuperar-senha'
                element={
                    <RecoverPasswordPage
                        accessButton={accessButton}
                        setAccessButton={setAccessButton}
                    />
                }
            />

            <Route
                path='/home'
                element={
                    <HomePage
                        accessButton={accessButton}
                        setAccessButton={setAccessButton}
                    />
                }
            />
        </Routes>
    </BrowserRouter>

  );
};

export default Router;
