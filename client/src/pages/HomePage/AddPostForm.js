import { Grid, Input, Textarea, Image } from '@chakra-ui/react';
import save from "../../images/save-icon.png"

const AddPostForm = () => {
    return (
        <Grid
            templateRows="1fr 6fr 0.5fr"
            width="100%"
            padding="30px"
            gap={3}
        >
            <Input
                placeholder='TÍTULO'
                variant={'unstyled'}
                textAlign={'center'}
            />
            <Textarea
                placeholder='Que parte da sua história você gostaria de contar hoje?'
                variant={'unstyled'}
                resize="none"
                borderTop={"1px solid #D3D3D3"}
                borderBottom={"1px solid #D3D3D3"}
                pt="20px"
                borderRadius="none"
            />
            <Image
                src={save}
                alt=''
                cursor="pointer"
                justifySelf={'center'}
            />
        </Grid>
    )
}

export default AddPostForm;