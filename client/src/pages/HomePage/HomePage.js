import Header from '../../components/Header';
import useProtectedPage from '../../hooks/useProtectedPage'
import Footer from '../../components/Footer';
import "../../styles/HomePage.css"
import { Grid, GridItem, Image, Text } from '@chakra-ui/react';
import post from "../../images/post-image.png"
import history from "../../images/history-image.png"
import gallery from "../../images/gallery-image.png"

const HomePage = () => {
    useProtectedPage();
    
    return (
        <div className='main'>
            <Header />
            <Grid
                templateColumns='1fr 9fr'
                gap={8}
                padding={"60px 100px"}
            >
                <GridItem
                    colSpan={1}
                    bg='rgba(173, 215, 253, 0.6)'
                    cursor={'pointer'}
                    borderRadius={20}
                    display="flex"
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={"130px"}
                    height={"130px"}
                    boxShadow={"2px 2px 4px rgba(128, 128, 128, 0.5)"}
                    _hover={{ bg: '#ADD7FD' }}
                >
                    <Image src={post} alt=''/>
                </GridItem>
                <GridItem
                    rowStart={2}
                    colSpan={1}
                    bg='rgba(173, 215, 253, 0.6)'
                    cursor={'pointer'}
                    padding={"30px"}
                    borderRadius={20}
                    display="flex"
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={"130px"}
                    height={"130px"}
                    boxShadow={"2px 2px 4px rgba(128, 128, 128, 0.5)"}
                    _hover={{ bg: '#ADD7FD' }}
                >
                    <Image src={history} alt='' />
                </GridItem>
                <GridItem
                    rowStart={3}
                    colSpan={1}
                    bg='rgba(173, 215, 253, 0.6)'
                    cursor={'pointer'}
                    padding={"30px"}
                    borderRadius={20}
                    display="flex"
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={"130px"}
                    height={"130px"}
                    boxShadow={"2px 2px 4px rgba(128, 128, 128, 0.5)"}
                    _hover={{ bg: '#ADD7FD' }}
                >
                    <Image src={gallery} alt='' />
                </GridItem>
                <GridItem
                    rowStart={1}
                    rowEnd={4}
                    bg={"rgba(217, 217, 217, 0.36)"}
                    borderRadius={20}
                    display={"flex"}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Text fontSize={"23px"}>
                        Clique em uma das opções à esquerda para ver algo aqui
                    </Text>
                </GridItem>
            </Grid>
            <Footer />
        </div>
    )
}

export default HomePage;