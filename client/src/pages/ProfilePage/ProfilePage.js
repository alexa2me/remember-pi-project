import { Box, Link, Text } from '@chakra-ui/react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import useProtectedPage from '../../hooks/useProtectedPage'
import ProfilePageForm from './ProfilePageForm';

const ProfilePage = () => {
    useProtectedPage();
    
    return (
        <Box
            backgroundColor="rgba(217, 217, 217, 0.36)"
            height="100vh"
            width='100vw'
            className='main'
            justifyContent='center'
        >
            <Header />
            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                margin='5% 30% 1.5% 30%'
            >
                <Text
                    fontSize='28px'
                    color='#474747'
                    fontFamily='roboto'
                >
                    Meu perfil
                </Text>
                <Link
                    fontSize='16px'
                    color='#474747'
                    fontFamily='roboto'
                >
                    Quero excluir meu perfil
                </Link>
            </Box>
            <Box
                width='40%'
                margin='0 auto'
            >
                <ProfilePageForm />
            </Box>
            <Footer />
        </Box>
    )
}

export default ProfilePage;