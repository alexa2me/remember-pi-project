import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';

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
                path='/home'
                // element={
                //     <HomePage
                //         accessButton={accessButton}
                //         setAccessButton={setAccessButton}
                //     />
                // }
            />
        </Routes>
    </BrowserRouter>

  );
};

export default Router;