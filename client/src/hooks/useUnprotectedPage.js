import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { goToWritePage } from '../routes/coordinator';

const useUnprotectedPage = () => {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            goToWritePage(navigate);
        }
    }, [navigate]);
};

export default useUnprotectedPage;