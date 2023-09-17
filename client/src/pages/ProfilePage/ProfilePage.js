import { useState, useRef } from "react";
import {
    Box,
    Button,
    Text,
    useToast,
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay
} from '@chakra-ui/react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import useProtectedPage from '../../hooks/useProtectedPage'
import ProfilePageForm from './ProfilePageForm';
import { deleteUser } from '../../services/user';
import { useNavigate } from 'react-router-dom';
import { goToLogin } from "../../routes/coordinator";

const ProfilePage = () => {
    useProtectedPage();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    const handleDeleteUser = async (id) => {
            const result = await deleteUser(id, setIsLoading);
            
            if(result.status) {
              setIsLoading(false)
              localStorage.removeItem('token');
              goToLogin(navigate)
      
              toast({
                  description: result.message,
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                  position: "top",
                  containerStyle: { maxWidth: "0.5" }
              });
          } else {
              toast({
                  description: result.error,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  position: "top",
                  containerStyle: { maxWidth: "0.5" }
              });
          }
          };
    
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
                <Button
                    size={'sm'}
                    color='#FFFFFF'
                    fontFamily='roboto'
                    backgroundColor='red'
                    onClick={onOpen}
                    _hover={{ backgroundColor: 'red.400'}}
                    
                >
                    Quero excluir meu perfil
                </Button>

                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Não se vá!
                        </AlertDialogHeader>

                        <AlertDialogBody>
                        Esta operação é irreversível,
                        tem certeza que deseja excluir o seu perfil? 😢
                        </AlertDialogBody>

                        <AlertDialogFooter display={'flex'} justifyContent={'space-between'}>
                        <Button colorScheme='red' onClick={handleDeleteUser}>
                            Excluir perfil
                        </Button>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancelar
                        </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
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