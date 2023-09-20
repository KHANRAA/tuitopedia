import {useMutation} from '@tanstack/react-query';
import {signUpRequest, signInRequest} from "../services/auth";
import {useNavigate} from "react-router-dom";
import useUserStore from "../store/userStore";

const useAuthSignUp = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: signUpRequest,
        onSuccess: () => {
            navigate('/auth/login')
        }
    });

}
const useSignIn = () => {
    const navigate = useNavigate();
    const {addUser} = useUserStore();
    return useMutation({
        mutationFn: signInRequest,
        onSuccess: (data, variables, context) => {
            addUser(data.data)
            localStorage.setItem('tuitoPediaToken', data.data.tuitoPediaToken || '');
            localStorage.setItem('tuitoPediaToken', data.data.tuitoPediaToken || '');
            localStorage.setItem('currentUser', JSON.stringify(data.data));
            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 5);
            localStorage.setItem('expiration', expiration.toISOString());
            navigate('/');
        }
    });

}

export {useAuthSignUp, useSignIn};



