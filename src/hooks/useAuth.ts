import {useQuery, useMutation} from '@tanstack/react-query';
import {signUpRequest, signInRequest, checkAuthLoader, getAuthToken, getAuthUser} from "../services/auth";
import {useNavigate} from "react-router-dom";


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
    return useMutation({
        mutationFn: signInRequest,
        onSuccess: (data, variables, context) => {
            console.log("hi from signin ...");
            console.log(data);
            const user = data.data;
            localStorage.setItem('tuitoPediaToken', user.tuitoPediaToken || '');
            localStorage.setItem('currentUser', JSON.stringify(user));
            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 5);
            localStorage.setItem('expiration', expiration.toISOString());
            navigate('/');
        }
    });

}

const useIsLoggedIn = () => {
    return useQuery({
        queryKey: ['isLoggedIn'],
        queryFn: checkAuthLoader,
    });

}


const useGetUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getAuthUser,
    });

}
const useGetToken = () => {
    return useQuery({
        queryKey: ['token'],
        queryFn: getAuthToken,

    });

}


export {useAuthSignUp, useSignIn, useIsLoggedIn, useGetToken, useGetUser};



