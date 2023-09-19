import logo from '../../images/remember-icon.png';
import decorativeImage from '../../images/decorative-image.jpg';
import useUnprotectedPage from '../../hooks/useUnprotectedPage'
import RecoverPasswordForm from './RecoverPasswordForm';
import { IconButton, Box, Image } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { goToLastPage } from '../../routes/coordinator';

const RecoverPasswordPage = () => {
    useUnprotectedPage();
    const navigate = useNavigate();
    
    return (
        <div className='main-container'>
             <Box position="relative">
                <IconButton
                    icon={<ArrowBackIcon />}
                    onClick={() => goToLastPage(navigate)}
                    position="absolute"
                    top={4}
                    left={4}
                    background="transparent"
                    color="white"
                    size={'lg'}
                    _hover={{ background: 'transparent' }}
                />
                <div className='input-form-container'>
                    <Image
                        src={logo}
                        alt='logo'
                        width={['150px', '250px']}
                        mb='40px'
                    />
                    <p className='login-page-title'>Recupere a sua senha</p>
                    <RecoverPasswordForm />
                </div>
            </Box>
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