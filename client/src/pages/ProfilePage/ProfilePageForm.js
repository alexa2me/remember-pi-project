import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import '../../styles/auth-layout.css'
import '../../styles/LoginPage.css'
import {
  InputGroup,
  Input,
  Button,
} from '@chakra-ui/react';


const ProfilePageForm = () => {
  const [form, onChange] = useForm({ email: '' });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmitForm}
      noValidate
    >
        <InputGroup
            display='flex'
            flexDirection='column'
            gap={2}
        >
            <InputGroup>
                <Input
                    type='name'
                    name={'name'}
                    value={form.name}
                    onChange={onChange}
                    backgroundColor={'#FFFFFF'}
                    borderRadius={25}
                    isRequired
                />
            </InputGroup>
            <InputGroup>
                <Input
                    type='email'
                    name={'email'}
                    value={form.email}
                    onChange={onChange}
                    backgroundColor={'#FFFFFF'}
                    borderRadius={25}
                    isRequired
                />
            </InputGroup>
            <InputGroup>
                <Input
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
            SALVAR
            </Button>
        </InputGroup>
    </form>
  )
};

export default ProfilePageForm;