import {createBrowserRouter} from "react-router-dom";
import LayOut from "./pages/LayOut";
import FAQPage from "./pages/FAQPage";
import ErrorPage from "./pages/ErrorPage";
import AuthenticationPage from './pages/AuthPage';
import CreateFaq from "./pages/Admin/CreateFaq";
import UserPage from "./pages/Admin/UserPage";
import {checkAdminLoader} from "./services/auth";
import HelpsPage from "./pages/Admin/HelpsPage";
import ManageFaqs from "./pages/Admin/ManageFaqs";


const router = createBrowserRouter([
    {
        path: '/',
        element: <LayOut/>,
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
                path: '/admin/faqs',
                loader: checkAdminLoader,
                element: <ManageFaqs/>,
                errorElement: <ErrorPage/>,
            },
            {
                path: '/admin/users',
                loader: checkAdminLoader,
                element: <UserPage/>,
                errorElement: <ErrorPage/>
            },
            {
                path: '/admin/helps',
                loader: checkAdminLoader,
                element: <HelpsPage/>,
                errorElement: <ErrorPage/>
            },
            {
                path: '/auth',
                element: <AuthenticationPage/>,
                errorElement: <ErrorPage/>,
            }
        ]
    },


]);

export default router;
