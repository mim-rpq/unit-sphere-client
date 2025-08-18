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
// import AdminProfile from "../Pages/DashBoard/Admin/AdminProfile";
import ManageMembers from "../Pages/DashBoard/Admin/ManageMember/ManageMembers";
import MakeAnnouncement from "../Pages/DashBoard/Admin/MakeAnnouncement";
import AgreementRequests from "../Pages/DashBoard/Admin/AgreementRequests";
import ManageCoupons from "../Pages/DashBoard/Admin/ManageCoupons";
import MemberProfile from "../Pages/DashBoard/Member/MemberProfile";
import UserProfile from "../Pages/DashBoard/User/UserProfile";
// import Announcements from "../Pages/Shared/Announcements";
import MakePaymentForm from "../Pages/DashBoard/Member/payment/MakePaymentForm";
import PaymentPage from "../Pages/DashBoard/Member/payment/PaymentPage";
import PaymentHistory from "../Pages/DashBoard/Member/PaymentHistory";
import DashboardHome from "../Pages/DashBoard/DashboardHome";
import AdminProfile from "../Pages/DashBoard/Admin/AdminProfile/AdminProfile";
import Announcements from "../Pages/DashBoard/Announcements";
import Contact from "../Components/Contact";
import AboutUs from "../Pages/AboutUs/AboutUs";
import FAQ from "../Pages/FAQ/Faq";
import DashboardStats from "../Pages/DashBoard/Admin/AdminProfile/DashboardStats";





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
            },
            {
                path:'/aboutUs',
                element:<AboutUs></AboutUs>
            },
            {
                path:'/faq',
                element:<FAQ></FAQ>
            },
            {
                path:'/contact',
                element:<PrivateRoute>
                    <Contact></Contact>
                </PrivateRoute>
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
        children:[
            {
                index:true,
                Component:DashboardHome
            },
            {
                path:'adminProfile',
                element:<AdminProfile></AdminProfile>
            },
              {
                path:'overview',
                element:<DashboardStats></DashboardStats>
            },
            {
                path:'manageMembers',
                element:<ManageMembers></ManageMembers>
            },
            {
                path:'makeAnnouncement',
                element:<MakeAnnouncement></MakeAnnouncement>
            },
            {
                path:'agreementRequests',
                element:<AgreementRequests></AgreementRequests>
            },
            {
                path:'manageCoupons',
                element:<ManageCoupons></ManageCoupons>
            },

            // member routes 
            {
                path:'memberProfile',
                element:<MemberProfile></MemberProfile>
            },

            {
                path:'announcements',
                element:<Announcements></Announcements>
            },
            {
                path:'makePayment',
                element:<MakePaymentForm></MakePaymentForm>
            },
            {
                path:'paymentPage',
                element:<PaymentPage></PaymentPage>
            },
            {
                path:'paymentHistory',
                element:<PaymentHistory></PaymentHistory>
            },

            // user routes 
            {
                path:'userProfile',
                element:<UserProfile></UserProfile>
            },
        ]
    
    },

    {
        path: '*',
        Component: NotFound
    }

])


export default router