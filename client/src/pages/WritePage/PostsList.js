import React, { useState, useEffect } from "react";
import { Grid, Box, GridItem, Spinner } from '@chakra-ui/react';
import axios from "axios";
import BASE_URL from "../../constants/urls";
import deleteIcon from "../../images/delete-icon.jpg";
import { deletePost } from "../../services/post"
import { useToast, Button, Image, Text } from '@chakra-ui/react'
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const PostList = () => {
    const toast = useToast(), boxSize='25px'
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);
    const [shouldFetchData, setShouldFetchData] = useState(true);
  
    useEffect(() => {
      if (shouldFetchData) {
      axios.get(`${BASE_URL}/post/getAll`, {
          headers: {
              Authorization: token
          }
        })
        .then((res) => {
          setIsLoading(false);
          setData(res.data);
          setShouldFetchData(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setShouldFetchData(false); 
        });
      }
    }, [shouldFetchData, token]);

    const handleDeletePost = async (id) => {
      const result = await deletePost(id, setIsLoading);
      
      if(result.status) {
        setShouldFetchData(true);
        setIsLoading(false)
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
            description: result.error,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
            containerStyle: { maxWidth: "0.5" }
        });
    }
    };

    const postsComponent = data.posts?.map((post, index, array) => {
      return (
        <Grid
          templateColumns={['20fr 3fr', '20fr 0.8fr']}
          m={{
            base: '10px 20px',
            lg: '10px 100px',
            md:'10px 40px',
            sm: '10px 30px'
          }}
          borderBottom={index !== array.length - 1 ? '1px solid lightgray' : 'none'}
          key={post.id}
        >
          <Box display='flex' alignItems='center'>
              <GridItem mr={2}>{index + 1}. {post.postTitle}</GridItem>
              <GridItem fontSize='xs'>{post.createdAt}</GridItem>
          </Box>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
          >
            <GridItem>
              <Button
                onClick={() => handleDeletePost(post.id)}
                backgroundColor={'transparent'}
              >
                <Image src={deleteIcon} />
              </Button>
            </GridItem>
          </Box>
        </Grid>
      );
    });

    const noListItemsComponent = (
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        minHeight='50vh'
      >
        <Text fontSize={'2xl'}>Comece a escrever para ver a sua lista de posts aqui! 😉</Text>
      </Box>
    );

    return (
      <div className="main">
          <Header />
          <Box
            height='333px'
            overflowY='auto'
            position='relative'
          >
            {isLoading ? (
                <Box
                  position='absolute'
                  top='50%'
                  left='50%'
                  transform='translate(-50%, -50%)'
                >
                  <Spinner
                      size='lg'
                      color='blue.500'
                  />
                </Box>
               ) : data.posts && data.posts.length > 0 ? (
                postsComponent
              ) : (
                noListItemsComponent
              )}
          </Box>
          <Footer />
      </div>
    )
}

export default PostList;