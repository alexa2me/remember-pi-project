import { Button } from '@chakra-ui/react'

const ButtonComponent = (props) => {
    return (
        <Button
            backgroundColor='#3F73F9'
            borderRadius={25}
            color={'#FFFFFF'}
            _hover={{ opacity: '50%' }}
            disabled={props.disabled}
            width='100%'
            type='submit'
            isLoading={props.isLoading}
        >
            {props.text}
        </Button>
    )
}

export default ButtonComponent;