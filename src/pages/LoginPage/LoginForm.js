import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import '../../styles/Layout.css'
import '../../styles/LoginPage.css'

const LoginForm = ({ setAccessButton }) => {
  let navigate = useNavigate()
  const [form, onChange, clear] = useForm({ email: ', password: ' });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitForm = (e) => {
    e.preventDefault();
    // login(form, clear, navigate, setAccessButton, setIsLoading);
  };

  return (
    <form
      onSubmit={onSubmitForm}
      className='input-form'
    >
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
            name={'email'}
            value={form.password}
            onChange={onChange}
        />
        <ButtonComponent
            text='ENTRAR'
            isLoading={isLoading ? true : false}
        />
    </form>
  )
};

export default LoginForm;