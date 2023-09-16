import Header from '../../components/Header';
import useProtectedPage from '../../hooks/useProtectedPage'
import Footer from '../../components/Footer';
import "../../styles/HomePage.css";

import AddPostForm from './AddPostForm';

const WritePage = () => {
    useProtectedPage();

    return (
        <div className='main'>
            <Header />
            <AddPostForm />
            <Footer />
        </div>
    )
}

export default WritePage;