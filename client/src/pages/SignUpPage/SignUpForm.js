import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import '../../styles/auth-layout.css'
import { signUp } from '../../services/signup'
import { goToLogin } from '../../routes/coordinator';
import { Text } from '@chakra-ui/layout';
import { Checkbox } from '@chakra-ui/checkbox';
import {
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react'
import {
  EmailIcon,
  LockIcon,
} from '@chakra-ui/icons'
import { CgProfile } from 'react-icons/cg';
import { useToast } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

const SignUpForm = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const [form, onChange, clear] = useForm({
    name: "",
    email: "",
    password: "",
  });
  
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const result = await signUp(form, navigate, setIsLoading);
    if(result.status) {
        if (!checked) {
          toast({
            description: "Você precisa concordar com os Termos de Uso e a Política de Privacidade",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
            containerStyle: { maxWidth: "0.5" }
          });
          return;
        }
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Faça login com seu e-mail e senha",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
          containerStyle: { maxWidth: "0.5" }
        });
        goToLogin(navigate);
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
  }

  return (
    <form
      onSubmit={onSubmitForm}
      className='input-form'
      noValidate
    >
        <InputGroup>
            <InputLeftElement pointerEvents='none'>
            <Icon as={ CgProfile } color='gray.400'/>
            </InputLeftElement>
            <Input
                placeholder='Nome'
                name="name"
                value={form.name}
                onChange={onChange}
                type='text'
                backgroundColor={'#FFFFFF'}
                borderRadius={25}
                width='100%'
                isRequired
            />
        </InputGroup>

        <InputGroup>
            <InputLeftElement pointerEvents='none'>
            <EmailIcon color='gray.400' />
            </InputLeftElement>
            <Input
                placeholder='E-mail'
                name="email"
                value={form.email}
                onChange={onChange}
                type='email'
                backgroundColor={'#FFFFFF'}
                borderRadius={25}
                width='100%'
                isRequired
            />
        </InputGroup>
        
        <InputGroup>
            <InputLeftElement pointerEvents='none'>
            <LockIcon color='gray.400' />
            </InputLeftElement>
            <Input
                placeholder='Senha'
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                backgroundColor={'#FFFFFF'}
                borderRadius={25}
                width='100%'
                isRequired
            />
        </InputGroup>
        <Text
            fontSize={14}
            width='100%'
            color='#FFFFFF'
            mb={5}
        >
            A senha deve conter 6 caracteres,
            ao menos um número, uma letra maiúscula, uma
            letra minúscula e um caractere especial.
        </Text>
        <Checkbox
            size='lg'
            onChange={(e) => setChecked(e.target.checked)}
            isRequired
            mb={5}>
            <Text
                fontSize={14}
                width='100%'
                color='#FFFFFF'
            >
                Li e concordo com os Termos de Uso
                e a Política de Privacidade
            </Text>
        </Checkbox>
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
          CRIAR CADASTRO
        </Button>
    </form>
  )
};

export default SignUpForm;