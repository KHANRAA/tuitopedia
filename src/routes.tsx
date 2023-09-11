import {createBrowserRouter} from "react-router-dom";
import LayOut from "./pages/LayOut";
import FAQPage from "./pages/FAQPage";
import ErrorPage from "./pages/ErrorPage";
import AuthenticationPage, {
    loader as authLoader,
} from './pages/AuthPage';
import CreateFaq from "./pages/Admin/CreateFaq";
import UserPage from "./pages/Admin/UserPage";
import {checkAdminLoader, checkAuthLoader, isLoggedInUser} from "./services/auth";


const router = createBrowserRouter([
    {
        path: '/',
        element: <LayOut/>,
        loader: isLoggedInUser,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <FAQPage/>},
            {
                path: '/admin/addfaq',
                loader: checkAdminLoader,
                element: <CreateFaq/>,
                errorElement: <ErrorPage/>,
            },
            {
                path: '/admin/users',
                loader: checkAdminLoader,
                element: <UserPage/>,
                errorElement: <ErrorPage/>
            },
            {
                path: '/auth',
                element: <AuthenticationPage/>,
                loader: authLoader
            }
        ]
    },


]);

export default router;
