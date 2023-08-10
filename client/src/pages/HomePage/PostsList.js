  import { Grid, Box, GridItem, Spinner } from '@chakra-ui/react';
  import { useState, useEffect } from "react";
  import axios from "axios";
  import BASE_URL from "../../constants/urls";
  import deleteIcon from "../../images/delete-icon.png";
  import editIcon from "../../images/edit-icon.png"

  const PostList = () => {
      const [data, setData] = useState([]);
      const token = localStorage.getItem('token');
      const [isLoading, setIsLoading] = useState(true);
    
      useEffect(() => {
        axios.get(`${BASE_URL}/post/getAll`,
          {
              headers: {
                  Authorization: token
              }
          })
          .then((res) => {
            setIsLoading(false)
            setData(res.data);
          })
          .catch((err) => {
            setIsLoading(false)
            alert(err);
          });
      }, []);


      const postsComponent = data.posts?.map((post, index, array) => {
        return (
          <Grid
            templateColumns='20fr 1fr'
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
                <img src={editIcon} />
              </GridItem>
              <GridItem>
                <img src={deleteIcon} />
              </GridItem>
            </Box>
          </Grid>
        );
      });

      return (
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
      )
  }

  export default PostList;