import AuthSignUp from "../components/Auth/AuthSignUp";
import AuthLogin from "../components/Auth/AuthLogIn";
import {defer, useNavigate, useLoaderData, useSearchParams} from "react-router-dom";
import {getAuthUser} from "../services/auth";


const AuthPage = () => {

    const {currentUser} = useLoaderData() as Awaited<ReturnType<typeof loader>>;
    console.log('currentUser');

    console.log(currentUser);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';
    if (currentUser) {
        navigate('/');
    }
    return (
        <>
            {isLogin ? <AuthLogin/> : <AuthSignUp/>}
        </>
    )

}

const loadUser = async () => {

    console.log('Loader Called ...');
    console.log(await getAuthUser());
    const user = await getAuthUser();
    return user && user.name;
}

export const loader = async () => {
    return {
        currentUser: await loadUser(),
    };
}


export default AuthPage;
