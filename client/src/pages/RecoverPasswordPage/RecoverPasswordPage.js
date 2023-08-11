import logo from '../../images/remember-icon.png';
import decorativeImage from '../../images/decorative-image.jpg';
import useUnprotectedPage from '../../hooks/useUnprotectedPage'
import RecoverPasswordForm from './RecoverPasswordForm';

const RecoverPasswordPage = () => {
    useUnprotectedPage();
    
    return (
        <div className='main-container'>
            <div className='input-form-container'>
                <img src={logo} alt='' className='Project logo'/>
                <p className='login-page-title'>Recupere a sua senha</p>
                <RecoverPasswordForm />
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

export default RecoverPasswordPage;