import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import '../../styles/auth-layout.css'
import '../../styles/LoginPage.css'
import {
  InputGroup,
  Input,
  InputLeftElement,
  Button,
} from '@chakra-ui/react';
import {
  EmailIcon,
} from '@chakra-ui/icons';

const RecoverPasswordForm = () => {
  const [form, onChange] = useForm({ email: '' });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
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
            width='100%'
            type='submit'
            isLoading={isLoading ? true : false}
        >
          RECUPERAR SENHA
        </Button>
    </form>
  )
};

export default RecoverPasswordForm;