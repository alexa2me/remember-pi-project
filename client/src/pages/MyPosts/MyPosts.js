import React, { useEffect, useState } from "react";
import { Grid, Box, GridItem, Spinner, Input, Textarea } from '@chakra-ui/react';
import axios from "axios";
import BASE_URL from "../../constants/urls";
import deleteIcon from "../../images/delete-icon.jpg";
import editIcon from "../../images/edit-icon.jpg";
import { deletePost, editPost } from "../../services/post"
import { useToast } from '@chakra-ui/react'
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Divider, Button } from "@chakra-ui/react";

const MyPosts = () => {
  const toast = useToast()
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);
    const [editingPostId, setEditingPostId] = useState(null);
    const [form, setForm] = useState({
      post_title: '',
      post_content: ''
    });
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
      axios.get(`${BASE_URL}/post/getAll`, {
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
        });
    }, [shouldRender]);

    const handleDeletePost = async (id) => {
      const result = await deletePost(id, setIsLoading);
      
      if(result.status) {
        setIsLoading(false)
        setData((prevData) => ({
          ...prevData,
          posts: prevData.posts.filter((post) => post.id !== id),
        }));

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

    const handleEditPost = (id) => {     
      setEditingPostId(id);
    };

    const handleSaveEdit = async (e, id) => {
      const result = await editPost(id, form, setIsLoading);

      if(result.status) {
        setShouldRender(!shouldRender);
        console.log(result)
        setForm({
          post_title: result.updated_post_title,
          post_content: result.updated_post_content
        });

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
      setEditingPostId(null);
    };

    const postsComponent = data.posts?.map((post, index, array) => {
      const isEditing = editingPostId === post.id;
  
      return (
        <React.Fragment key={post.id}>
          <Grid
            templateAreas={
              `"title icon"
              "content content"
              "date date"`
            }
            gridTemplateRows={'0.5fr 1fr 0.3fr'}
            gridTemplateColumns={'1fr 0.2fr'}
            m={{ lg: '20px 100px', md:'20px 40px', sm: '20px 20px' }}
          >
            <GridItem mr={2} area={'title'}>
              {isEditing ? (
                <Input
                  type="text"
                  value={form.post_title}
                  onChange={(e) => setForm({ ...form, post_title: e.target.value })}
                />
              ) : (
                post.postTitle
              )}
            </GridItem>
            <Box display='flex' justifyContent="end" alignItems={'center'} m={2} gap={4}>
              <GridItem area={'icon'}>
              {isEditing ? (
              <Button type="submit" onClick={(e) => handleSaveEdit(e, post.id)}>
                  Save
              </Button>
              ) : (
                <Button onClick={() => handleEditPost(post.id)}>
                  <img src={editIcon} alt="Edit" />
                </Button>
              )}
              </GridItem>
              <GridItem area={'icon'}>
                <button onClick={() => handleDeletePost(post.id)}>
                  <img src={deleteIcon} alt="Delete" />
                </button>
              </GridItem>
            </Box>
            <GridItem area={'content'}>
              {isEditing ? (
                <Textarea
                  value={form.post_content}
                  onChange={(e) => setForm({ ...form, post_content: e.target.value })}
                />
              ) : (
                post.postContent
              )}
            </GridItem>
            <GridItem area={'date'}>{post.createdAt}</GridItem>
          </Grid>
          <Divider />
        </React.Fragment>
      );
    });
  
    return (
      <div className="main">
        <Header />
        <Box
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
          ) : (
            postsComponent
          )}
        </Box>
        <Footer />
      </div>
    );
  }
  
  export default MyPosts;
  
  
  
  
  
  