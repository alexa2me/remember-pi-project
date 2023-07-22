import Header from '../../components/Header';
import useProtectedPage from '../../hooks/useProtectedPage'
import Footer from '../../components/Footer';
import "../../styles/HomePage.css"

const HomePage = () => {
    useProtectedPage();
    
    return (
        <div className='main'>
            <Header />
            <Footer />
        </div>
    )
}

export default HomePage;