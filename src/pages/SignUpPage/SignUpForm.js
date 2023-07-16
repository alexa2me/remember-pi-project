import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import '../../styles/Layout.css'
import '../../styles/SignUpPage.css'
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { Text } from '@chakra-ui/layout';
import { Checkbox } from '@chakra-ui/checkbox';


const SignUpForm = ({ setAccessButton }) => {
  let navigate = useNavigate()
  const [form, onChange, clear] = useForm({
    username: '',
    email: '',
    password: '',
  });
  const [checked, setChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitForm = (e) => {
    e.preventDefault();
    // signup(form, clear, navigate, setAccessButton, setIsLoading);
  };

  return (
    <form
      onSubmit={onSubmitForm}
      className='input-form'
    >
        <InputComponent 
            placeholder='Nome'
            icon='profile'
            name={'username'}
            value={form.username}
            onChange={onChange}
            type='text'
        />
        <InputComponent 
            placeholder='E-mail'
            icon='email'
            name={'email'}
            value={form.email}
            onChange={onChange}
            type='email'
        />
        <InputComponent
            placeholder='Senha'
            type='password'
            icon='password'
            name={'password'}
            value={form.password}
            onChange={onChange}
        />
        <Text
            fontSize={14}
            width='100%'
            color='#696969'
            mt={-2}
            mb={5}
        >
            A sua senha deve possuir no mínimo 6 caracteres
        </Text>
        <Checkbox
            size='lg'
            onChange={(e) => setChecked(e.target.checked)}
            isRequired
            mb={5}>
            <Text
                fontSize={14}
                width='100%'
                color='#474A51'
            >
                Li e concordo com os Termos de Uso e a Política
                de Privacidade
            </Text>
        </Checkbox>
        <ButtonComponent
            text='CRIAR CADASTRO'
            isLoading={isLoading ? true : false}
        />
    </form>
  )
};

export default SignUpForm;