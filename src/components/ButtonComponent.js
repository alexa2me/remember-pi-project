import { Button } from '@chakra-ui/react'

const ButtonComponent = (props) => {
    return (
        <Button
            backgroundColor='#3F73F9'
            borderRadius={25}
            color={'#FFFFFF'}
            width={"28rem"}
            _hover={{ opacity: '50%' }}
        >
            {props.text}
        </Button>
    )
}

export default ButtonComponent;