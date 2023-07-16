import React from 'react';
import '../../styles/SignUpPage.css';
import '../../styles/Layout.css'
import logo from '../../images/remember-icon.png';
import decorativeImage from '../../images/decorative-image.jpg';
import SignUpForm from './SignUpForm'
import useUnprotectedPage from '../../hooks/useUnprotectedPage';

const SignUpPage = ({ setAccessButton }) => {
    useUnprotectedPage();

    return (
        <div className='main-container'>
            <div className='input-form-container'>
                <img src={logo} alt='' className='Project logo'/>
                <p className='login-page-title'>CADASTRO</p>
                <SignUpForm setAccessButton={setAccessButton}/>
            </div>
            <div className='right-side-container'>
                <img
                    src={decorativeImage}
                    alt='Girl writing in a laptop'
                    className='girl-writing-image'
                />
            </div>
        </div>
    )
}

export default SignUpPage;