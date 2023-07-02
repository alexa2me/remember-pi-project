import './styles/App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Login from "./pages/login/Login"

const App = () => {
  return (
    <ChakraProvider>
      <Login />
    </ChakraProvider>
  );
}

export default App;
