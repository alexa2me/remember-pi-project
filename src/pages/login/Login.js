import '../../styles/Login.css';
import logo from '../../images/remember-icon.png';
import decorativeImage from '../../images/decorative-image.jpg';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';

const Login = () => {
    return (
        <div className='main-container'>
            <div className='input-form-container'>
                <img src={logo} alt="" className='Project logo'/>
                <p className='login-page-title'>LOGIN</p>
                <InputComponent 
                    placeholder='E-mail'
                    icon='email'
                    isRequired
                />
                <InputComponent
                    placeholder='Senha'
                    type='password'
                    icon='password'
                    isRequired
                />
                <ButtonComponent
                    text='ENTRAR'
                    width={{ lg: '25vw', md: '50vw', sm: '60vw' }}
                    
                />
                <a href='link-here'>
                    <p className='recover-password'>
                        Esqueci minha senha
                    </p>
                </a>
                <div>
                    <p className='signup-question'>
                        Ainda não possui cadastro?
                    </p>
                    <a href='link-here'> 
                        <p className='signup-link'>Cadastre-se aqui</p>
                    </a>
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

export default Login;