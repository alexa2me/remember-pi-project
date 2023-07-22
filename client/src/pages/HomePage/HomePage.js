import useUnprotectedPage from '../../hooks/useUnprotectedPage'
import cat from '../../images/cat.gif'

const HomePage = () => {
    useUnprotectedPage();
    
    return (
        <div>
            <img src={cat} style={{ margin: 'auto' }}/>
            <h1 style={{ textAlign: 'center', fontSize: '50px' }}>HOME</h1>
        </div>
    )
}

export default HomePage;