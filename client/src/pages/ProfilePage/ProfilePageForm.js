import React, { useEffect, useState } from 'react';
import '../../styles/auth-layout.css'
import '../../styles/LoginPage.css'
import {
  InputGroup,
  Input,
  Button,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';
import BASE_URL from '../../constants/urls';
import { editUser } from '../../services/user';

const ProfilePageForm = () => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');
  const [inputChange, setInputChange] = useState(false);
  const toast = useToast();

  useEffect(() => {
    axios.get(`${BASE_URL}/user/getById`, {
      headers: {
        Authorization: token
      }
    })
    .then((res) => {
      setIsLoading(false)
      setData(res.data.user);
      setForm(res.data.user);
    })
    .catch((err) => {
      setIsLoading(false)
    });
  }, []);

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const newValue = e.target.value;

    if (newValue !== data[fieldName]) {
      setInputChange(true);
    } else {
      setInputChange(false);
    }

    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: newValue,
    }));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const result = await editUser(form, setIsLoading);

    if(result.status) {
      setIsLoading(false);
      setInputChange(false);
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    backgroundColor={'#FFFFFF'}
                    borderRadius={25}
                    isRequired
                />
            </InputGroup>
            
            <Button
                backgroundColor='#3F73F9'
                borderRadius={25}
                color={'#FFFFFF'}
                _hover={ inputChange && { opacity: '50%' }}
                isDisabled={!inputChange}
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
