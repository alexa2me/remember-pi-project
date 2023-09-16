import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import RecoverPasswordPage from '../pages/RecoverPasswordPage/RecoverPasswordPage';
import WritePage from '../pages/WritePage/WritePage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import PostList from '../pages/WritePage/PostsList';
import MyPosts from '../pages/MyPosts/MyPosts';

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
                path='/perfil'
                element={
                    <ProfilePage
                        accessButton={accessButton}
                        setAccessButton={setAccessButton}
                    />
                }
            />

            <Route
                path='/escrever'
                element={
                    <WritePage
                        accessButton={accessButton}
                        setAccessButton={setAccessButton}
                    />
                }
            />

            <Route
                path='/historico'
                element={
                    <PostList
                        accessButton={accessButton}
                        setAccessButton={setAccessButton}
                    />
                }
            />

            <Route
                path='/meus-posts'
                element={
                    <MyPosts
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
