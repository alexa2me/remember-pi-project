import { Button } from '@chakra-ui/react'

const ButtonComponent = (props) => {
    return (
        <Button
            backgroundColor='#3F73F9'
            borderRadius={25}
            color={'#FFFFFF'}
            _hover={{ opacity: '50%' }}
            disabled={props.disabled}
            width={{ lg: '25vw', md: '50vw', sm: '60vw'}}
        >
            {props.text}
        </Button>
    )
}

export default ButtonComponent;