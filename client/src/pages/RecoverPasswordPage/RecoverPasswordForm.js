import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import '../../styles/auth-layout.css'
import '../../styles/LoginPage.css'
import {
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  useToast,
  Box,
} from '@chakra-ui/react';
import {
  EmailIcon,
} from '@chakra-ui/icons';
import { resetPassword } from '../../services/user';

const RecoverPasswordForm = () => {
  const toast = useToast();

  const [form, onChange] = useForm({ email: '' });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const result = await resetPassword(form, setIsLoading);

    if(result.status) {
      setIsLoading(false);
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
            description: result.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
            containerStyle: { maxWidth: "0.5" }
        });
    }
  };


  return (
    <form
      onSubmit={onSubmitForm}
      className='input-form'
      noValidate
    >
        <InputGroup>
            <InputLeftElement pointerEvents='none'>
            <EmailIcon color='gray.400' />
            </InputLeftElement>
            <Input
                placeholder='E-mail'
                type='email'
                name={'email'}
                value={form.email}
                onChange={onChange}
                backgroundColor={'#FFFFFF'}
                borderRadius={25}
                isRequired
            />
        </InputGroup>
        <Button
            backgroundColor='#3F73F9'
            borderRadius={25}
            color={'#FFFFFF'}
            _hover={{ opacity: '50%' }}
            disabled={false}
            type='submit'
            isLoading={isLoading ? true : false}
        >
          RECUPERAR SENHA
        </Button>
    </form>
  )
};

export default RecoverPasswordForm;