import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../images/remember-icon.png"
import { Grid, GridItem, Text, Box, Button, Menu, MenuButton, MenuList, MenuItem, useBreakpointValue, Image } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { goToWritePage, goToLogin, goToPostList, goToProfile, goToMyPosts } from "../routes/coordinator";

const Header = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const location = useLocation();
    const isProfilePage = location.pathname === "/perfil";
    const [addPost, setAddPost] = useState(false)
    const [showPostsList, setShowPostsList] = useState(false)
    const isWritePage = location.pathname === "/escrever";
    const isMyPostsPage = location.pathname === "/meus-posts";
    const isPostListPage = location.pathname === "/historico";

    const handleShowAddPost = () => {
        setAddPost(true);
        setShowPostsList(false);
    };

    const handleShowPostsList = () => {
        setShowPostsList(true);
        setAddPost(false);
    };

    const logout = () => {
        if (token) {
            localStorage.removeItem("token");
            goToLogin(navigate);
        }
    };

    const isMobile = useBreakpointValue({ base: true, md: false, lg: false, sm: true }); 

    return (
        <Grid
            templateColumns={['1fr 3fr', '1fr 5fr', '0.6fr 5fr 4fr']}
            gap={4}
            backgroundColor={"#734A91"}
            padding={{ lg: '20px 100px', md: '20px 40px', sm: '20px 20px' }}
            alignItems={"center"}
            fontFamily='roboto'
            mb={[5, 35]}
        >
            <GridItem onClick={() => goToWritePage(navigate)}>
                <Image
                    src={logo}
                    alt="Logo"
                    m={3}
                    width={{ base: '80px', lg: '100px' }}
                />
            </GridItem>
            {!isMobile && (
                <Text
                color={"#FFFFFF"}
                textShadow={"3px 3px 3px #9C9C9C"}
                fontSize={{ base: 'lg', lg: '5xl' }}
                onClick={() => goToWritePage(navigate)}
                fontFamily="Ruluko"
                >
                Remember
                </Text>
            )}
            <Box
                display={['none', 'flex']}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Text
                    as="a"
                    href="/escrever"
                    color={"#FFFFFF"}
                    textShadow={"3px 3px 3px #9C9C9C"}
                    cursor={"pointer"}
                    fontSize={22}
                    width={"fit-content"}
                    _hover={{ textDecoration: isWritePage ? "none" : "underline" }}
                    textDecoration={isWritePage ? "underline" : "none"}
                    justifySelf={"end"}
                >
                    Escrever
                </Text>
                <Text
                    as="a"
                    href="/meus-posts"
                    color={"#FFFFFF"}
                    textShadow={"3px 3px 3px #9C9C9C"}
                    cursor={"pointer"}
                    fontSize={22}
                    width={"fit-content"}
                    _hover={{ textDecoration: isMyPostsPage ? "none" : "underline" }}
                    textDecoration={isMyPostsPage ? "underline" : "none"}
                    justifySelf={"end"}
                >
                    Meus posts
                </Text>
                <Text
                    as="a"
                    href="/historico"
                    color={"#FFFFFF"}
                    textShadow={"3px 3px 3px #9C9C9C"}
                    cursor={"pointer"}
                    fontSize={22}
                    width={"fit-content"}
                    _hover={{ textDecoration: isPostListPage ? "none" : "underline" }}
                    textDecoration={isPostListPage ? "underline" : "none"}
                    justifySelf={"end"}
                >
                    Histórico
                </Text>
                <Text
                    as="a"
                    href="/perfil"
                    color={"#FFFFFF"}
                    textShadow={"3px 3px 3px #9C9C9C"}
                    cursor={"pointer"}
                    fontSize={22}
                    width={"fit-content"}
                    _hover={{ textDecoration: isProfilePage ? "none" : "underline" }}
                    textDecoration={isProfilePage ? "underline" : "none"}
                    justifySelf={"end"}
                >
                    Perfil
                </Text>
                <Text
                    onClick={logout}
                    color={"#FFFFFF"}
                    textShadow={"3px 3px 3px #9C9C9C"}
                    cursor={"pointer"}
                    fontSize={22}
                    width={"fit-content"}
                    _hover={{ textDecoration: "underline" }}
                    justifySelf={"end"}
                >
                    Sair
                </Text>
            </Box>
            <Box
    display={['flex', 'none']}
    justifyContent="flex-end"
>
    <Menu>
        <MenuButton
            as={Button}
            rightIcon={<HamburgerIcon />}
            variant="unstyled"
            color={"#FFFFFF"}
            size={"lg"}
        />
        <MenuList
            backgroundColor={"#734A91"}
            borderWidth={0}
            borderRadius={0}
        >
            <MenuItem
                onClick={() => goToWritePage(navigate)}
                backgroundColor={"#734A91"}
                color={"#FFFFFF"}
            >
                Escrever
            </MenuItem>
            <MenuItem
                onClick={() => goToMyPosts(navigate)}
                backgroundColor={"#734A91"}
                color={"#FFFFFF"}
            >
                Meus posts
            </MenuItem>
            <MenuItem
                onClick={() => goToPostList(navigate)}
                backgroundColor={"#734A91"}
                color={"#FFFFFF"}
            >
                Histórico
            </MenuItem>
            <MenuItem
                onClick={() => goToProfile(navigate)}
                backgroundColor={"#734A91"}
                color={"#FFFFFF"}
            >
                Perfil
            </MenuItem>
            <MenuItem
                onClick={logout}
                backgroundColor={"#734A91"}
                color={"#FFFFFF"}
            >
                Sair
            </MenuItem>
        </MenuList>
    </Menu>
</Box>

        </Grid>
    );
};

export default Header;
