import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import BASE_URL from "../../constants/urls";
import deleteIcon from "../../images/delete-icon.jpg";
import editIcon from "../../images/edit-icon.jpg";
import save from "../../images/save-icon.png"
import { deletePost, editPost } from "../../services/post"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
    Divider,
    Button,
    Text,
    useToast,
    Grid,
    Box,
    GridItem,
    Spinner,
    Input,
    Textarea,
    Image
} from "@chakra-ui/react";

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
    }, []);

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
      const postToEdit = data.posts.find(post => post.id === id);
      setForm({
      post_title: postToEdit.postTitle,
      post_content: postToEdit.postContent
    });
      setEditingPostId(id);
    };

    const handleSaveEdit = async (e, id) => {
      const result = await editPost(id, form, setIsLoading);

      if(result.status) {
        setData((prevData) => ({
          ...prevData,
          posts: prevData.posts.map((post) =>
            post.id === id
              ? {
                  ...post,
                  postTitle: result.updated_post_title,
                  postContent: result.updated_post_content
                }
              : post
          )
        }));

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
        <Fragment key={post.id}>
          <Grid
            templateAreas={
              `"title icon"
              "content content"
              "date date"`
            }
            gridTemplateRows={'0.2fr 1fr 0.2fr'}
            gridTemplateColumns={'1fr 0.7fr'}
            m={{
              base: '10px 20px',
              lg: '10px 100px',
              md:'10px 40px',
              sm: '10px 30px'
            }}
          >
            <GridItem mr={2} area={'title'}>
              {isEditing ? (
                <Input
                  type="text"
                  value={form.post_title}
                  onChange={(e) => setForm({ ...form, post_title: e.target.value })}
                  fontWeight={'normal'}
                />
              ) : (
                <Text as={'b'} fontSize={'lg'}>{post.postTitle}</Text>
              )}
            </GridItem>
            <Box display='flex' justifyContent="end" alignItems={'center'} gap={[0, 2]}>
              <GridItem area={'icon'}>
              {isEditing ? (
              <Button
                type="submit"
                onClick={(e) => handleSaveEdit(e, post.id)}
                backgroundColor={'transparent'}
              >
                  <Image
                        src={save}
                        alt=''
                        cursor="pointer"
                        boxSize='25px'
                    />
              </Button>
              ) : (
                <Button
                  onClick={() => handleEditPost(post.id)}
                  backgroundColor={'transparent'}
                >
                  <Image src={editIcon} alt="Edit" />
                </Button>
              )}
              </GridItem>
              <GridItem area={'icon'}>
                <Button
                  onClick={() => handleDeletePost(post.id)}
                  backgroundColor={'transparent'}
                >
                  <Image src={deleteIcon} alt="Delete" />
                </Button>
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
            <GridItem area={'date'} fontSize='sm'>{post.createdAt}</GridItem>
          </Grid>
          <Divider />
        </Fragment>
      );
    });

    const noPostsComponent = (
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        minHeight='50vh'
      >
        <Text fontSize={'2xl'}>Comece a escrever para ver seus posts aqui! 😉</Text>
      </Box>
    );
  
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
           ) : data.posts && data.posts.length > 0 ? (
            postsComponent
          ) : (
            noPostsComponent
          )}
        </Box>
        <Footer />
      </div>
    );
  }
  
  export default MyPosts;
  