import { Grid, Input, Textarea, Image } from '@chakra-ui/react';
import save from "../../images/save-icon.png"
import { useState } from 'react';
import useForm from '../../hooks/useForm';
import '../../styles/auth-layout.css'
import { useToast, Button } from '@chakra-ui/react'
import { post } from "../../services/post"

const AddPostForm = () => {
    const toast = useToast()
    const [form, onChange, clear] = useForm({
        post_title: '',
        post_content: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const result = await post(form, setIsLoading);

        if(result.status) {
            setIsLoading(false)
            toast({
                description: result.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
                containerStyle: { maxWidth: "0.5" }
            });
            clear();
        } else {
            toast({
                description: result.error,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
                containerStyle: { maxWidth: "0.5" }
            });
        }
    };

    return (
        <form onSubmit={onSubmitForm}>
            <Grid
                templateRows="1fr 10fr 0.5fr"
                padding="10px 30px"
                gap={3}
            >
                <Input
                    placeholder='TÍTULO'
                    variant={'unstyled'}
                    textAlign={'center'}
                    name="post_title"
                    value={form.post_title}
                    onChange={onChange}
                />
                <Textarea
                    placeholder='Que parte da sua história você gostaria de contar hoje?'
                    variant={'unstyled'}
                    resize="none"
                    borderTop={"1px solid #D3D3D3"}
                    borderBottom={"1px solid #D3D3D3"}
                    pt="20px"
                    borderRadius="none"
                    name="post_content"
                    value={form.post_content}
                    onChange={onChange}
                />
                <Button
                    justifySelf={'center'}
                    type='submit'
                    isLoading={isLoading ? true : false}
                    _hover="none"
                >
                    <Image
                        src={save}
                        alt=''
                        cursor="pointer"
                    />
                </Button>
            </Grid>
        </form>
    )
}

export default AddPostForm;