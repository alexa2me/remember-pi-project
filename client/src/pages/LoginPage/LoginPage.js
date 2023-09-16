import logo from '../../images/remember-icon.png';
import decorativeImage from '../../images/decorative-image.jpg';
import { goToRecoverPassword, goToSignUp } from '../../routes/coordinator';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm'
import { Link } from '@chakra-ui/layout';
import useUnprotectedPage from '../../hooks/useUnprotectedPage'

const LoginPage = ({ setAccessButton }) => {
    useUnprotectedPage();
    const navigate = useNavigate();
    
    return (
        <div className='main-container'>
            <div className='input-form-container'>
                <img src={logo} alt='' className='Project logo'/>
                <p className='login-page-title'>LOGIN</p>
                <LoginForm setAccessButton={setAccessButton} />
                <Link
                    className='recover-password'
                    onClick={() => goToRecoverPassword(navigate)}
                    color="#FFFFFF"
                    textDecoration='underline'
                    mb='10px'
                >
                    Esqueci minha senha
                </Link>
                <div>
                    <p className='signup-question'>
                        Ainda não possui cadastro?
                    </p>
                    <Link
                        onClick={() => goToSignUp(navigate)}
                    > 
                        <p className='signup-link'>Cadastre-se aqui</p>
                    </Link>
                </div>
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

export default LoginPage;