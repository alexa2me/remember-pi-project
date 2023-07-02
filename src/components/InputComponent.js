import {
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Icon,
} from '@chakra-ui/react'

import {
    EmailIcon,
    LockIcon,
} from '@chakra-ui/icons'
import { CgProfile } from 'react-icons/cg';


const InputComponent = (props) => {
    return (
        <Stack spacing={4}>
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    {props.icon === 'email' ?
                    <EmailIcon color="gray.400" /> :
                    props.icon === 'password' ?
                    <LockIcon color="gray.400"/> :
                    props.icon === 'profile' &&
                    <Icon as={ CgProfile } color="gray.400"/>
                    }
                </InputLeftElement>
                <Input
                    type={props.type}
                    placeholder={props.placeholder}
                    backgroundColor={"#ffffff"}
                    borderRadius={25}
                    width={"28rem"}
                />
            </InputGroup>
        </Stack>
    )
}

export default InputComponent;