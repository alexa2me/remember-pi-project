import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth-layout.css'
import '../../styles/LoginPage.css'
import { login } from '../../services/login'
import {
  InputGroup,
  Input,
  InputLeftElement,
  Button,
} from '@chakra-ui/react';
import {
  EmailIcon,
  LockIcon,
} from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react'
import { goToWritePage } from "../../routes/coordinator";

const LoginForm = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const [form, onChange, clear] = useForm({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const result = await login(form, navigate, setIsLoading);

    if(result.status) {
        localStorage.setItem("token", result.token);
        goToWritePage(navigate);
        clear();
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
                name={'email'}
                value={form.email}
                onChange={onChange}
                type='email'
                backgroundColor={'#FFFFFF'}
                borderRadius={25}
                isRequired
            />
        </InputGroup> 
        <InputGroup>
            <InputLeftElement pointerEvents='none'>
            <LockIcon color='gray.400' />
            </InputLeftElement>
            <Input
                placeholder='Senha'
                type='password'
                name={'password'}
                value={form.password}
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
            width='100%'
            type='submit'
            isLoading={isLoading ? true : false}
        >
          ENTRAR
        </Button>
    </form>
  )
};

export default LoginForm;