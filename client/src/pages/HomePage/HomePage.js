import { useState } from 'react';
import Header from '../../components/Header/Header';
import useProtectedPage from '../../hooks/useProtectedPage'
import cat from '../../images/cat.gif';

const HomePage = () => {
    useProtectedPage();
    
    return (
        <div>
            <Header />
            <img src={cat} style={{ margin: 'auto' }}/>
            <h1 style={{ textAlign: 'center', fontSize: '50px' }}>HOME</h1>
        </div>
    )
}

export default HomePage;