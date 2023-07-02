import '../../styles/Login.css';
import logo from "../../images/remember-icon.png"
import InputComponent from "../../components/InputComponent";
import ButtonComponent from '../../components/ButtonComponent';

const Login = () => {
    return (
        <div className="main-container">
            <div className="input-form-container">
                <img src={logo} alt="" className="logo"/>
                <p className="login-page-title">LOGIN</p>
                <InputComponent 
                    placeholder="E-mail"
                    icon="email"
                />
                <InputComponent
                    placeholder="Senha"
                    type="password"
                    icon="password"
                />
                <ButtonComponent
                    text="ENTRAR"
                    
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
            <div>
            </div>
        </div>
    )
}

export default Login;