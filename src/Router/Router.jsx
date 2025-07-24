import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import NotFound from "../Pages/Error/NotFound";
import Apartments from "../Components/Apartments";
import PrivateRoute from "../Provider/PrivateRoute";
import DashBoardLayout from "../Layouts/DashBoardLayout";


const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayout,
        children:[
            {
                index: true,
                Component:Home

            },
            {
                path:'/apartments',
                element:<Apartments></Apartments>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "/auth/login",
                element: <Login></Login>
            },
            {
                path: "/auth/register",
                element: <Register></Register>
            }
        ]

    },

    {
        path:'/dashboard',
        element:<PrivateRoute>
            <DashBoardLayout/>
        </PrivateRoute>,
    
    },

    {
        path: '*',
        Component: NotFound
    }

])


export default router