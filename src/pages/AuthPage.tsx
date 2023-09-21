import AuthSignUp from "../components/Auth/AuthSignUp";
import AuthLogin from "../components/Auth/AuthLogIn";
import {useNavigate, useSearchParams} from "react-router-dom";
import useUserStore from "../store/userStore";
import {useEffect} from "react";


const AuthPage = () => {
    const navigate = useNavigate();
    const {user} = useUserStore();
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';
    useEffect(() => {
        console.log(searchParams.get('mode'));
    }, []);
    if (user && user.tuitoPediaToken) {
        navigate('/');
    }
    return (
        <>
            {!isLogin ? <AuthSignUp/> : <AuthLogin/>}
        </>
    )

}


export default AuthPage;
