import React, { useState, useEffect } from "react";
import { Grid, Box, GridItem, Spinner } from '@chakra-ui/react';
import axios from "axios";
import BASE_URL from "../../constants/urls";
import deleteIcon from "../../images/delete-icon.jpg";
import { deletePost } from "../../services/post"
import { useToast } from '@chakra-ui/react'
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const PostList = () => {
    const toast = useToast()
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
          templateColumns='20fr 0.5fr'
          padding="8px 0px"
          mr={5}
          borderBottom={index !== array.length - 1 ? '1px solid lightgray' : 'none'}
        >
          <Box display='flex' alignItems='center'>
              <GridItem mr={2}>{index + 1}. {post.postTitle}</GridItem>
              <GridItem fontSize='small'>{post.createdAt}</GridItem>
          </Box>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
          >
            <GridItem>
              <button onClick={() => handleDeletePost(post.id)}>
                <img src={deleteIcon} />
              </button>
            </GridItem>
          </Box>
        </Grid>
      );
    });

    return (
      <div className="main">
          <Header />
          <Box
            height='333px'
            overflowY='auto'
            position='relative'
          >
            {
              isLoading ? (
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
              ) : (
                postsComponent
              )
            }
          </Box>
          <Footer />
      </div>
    )
}

export default PostList;