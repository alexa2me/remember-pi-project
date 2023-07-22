import { goToLogin } from "../../routes/coordinator";
import { useNavigate } from 'react-router-dom';
import logo from "../../images/remember-icon.png"
import { Grid, GridItem, Text } from "@chakra-ui/react";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  const logout = () => {
    if (token) {
      localStorage.removeItem("token");
      goToLogin(navigate);
    }
  };

  return (
    <Grid
        templateColumns='0.5fr 5fr 0.5fr 0.5fr'
        gap={4}
        columns={4}
        backgroundColor={"#DACAE8"}
        padding={{ lg: '20px 100px', md:'20px 40px', sm: '20px 20px' }}
        alignItems={"center"}
    >
        <GridItem width={"100px"}>
            <img src={logo} alt="Logo" className="logo-header"/>
        </GridItem>
        <Text
            color={"#FFFFFF"}
            textShadow={"3px 3px 3px #9C9C9C"}
            fontSize={{ base: '30px', lg: '40px'}}
        >
            Remember
        </Text>
        <Text
            color={"#FFFFFF"}
            textShadow={"3px 3px 3px #9C9C9C"}
            cursor={"pointer"}
            fontSize={22}
            width={"fit-content"}
            _hover={{ textDecoration: "underline" }}
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
    </Grid>
  );
};

export default Header;
