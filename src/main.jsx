import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import ErrorPage from "./Component/ErrorPage/ErrorPage";
import Login from "./Component/Login&register/Login.jsx";
import Register from "./Component/Login&register/Register.jsx";
import LayoutAPP from "./Layouts/LayoutAPP.jsx";
import ProtectedRoutes from "./Component/ProtectedRoutes/ProtectedRoutes.jsx";
import LayoutAuth from "./Layouts/LayoutAuth.jsx";
import ParentCourese from "./Component//TeacherCourseCards/addLecture/ParentCourese.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Home from "./Component/Home/Home.jsx";
import JustFirst from "./Layouts/JustFirst.jsx";
import Story from "./Redux/Store.jsx";
import OtpVerify from "./Component/Login&register/OtpVerify.jsx";
import AddCourse from "./Component/AddCourse/AddCourse.jsx";
import EditCourse from "./Component/TeacherCourseCards/EditCourse/EditCourse.jsx";
import EditProfile from "./Component/EditProfile/EditProfile.jsx";
import Settings from "./Component/Settings/Settings.jsx";
import ChangePassword from "./Component/Settings/ChangePassword.jsx";
import ForgetPassword from "./Component/Settings/ForgetPassword.jsx";
import ResetPassword from "./Component/Settings/ResetPassword.jsx";


const routers = createBrowserRouter([
  {
    path: '/',
    element: (<JustFirst />)
    ,
    children: [
      { index: true, element: <Home /> },
      { path: 'Home', element: <Home /> },
      { path: '*', element: <ErrorPage /> },
    ],
  },
  {
    path: '/',
    element: (
      <ProtectedRoutes>
        <LayoutAPP />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "Home", element: <Home /> },
      { path: "Courses", element: <ParentCourese /> },
      { path: "Dashboard", element: <Dashboard /> },
      { path: "AddCourse", element: <AddCourse /> },
      { path: "edit-course/:id", element: <EditCourse /> },
      { path: "courses/:id", element: <ParentCourese /> },
      { path: "/edit-profile", element: <EditProfile />},
      { path: "/Setting/*", element: <Settings />},
      { path: "/Settings/change-password", element: <ChangePassword />},
      { path: "/Settings/forget-password", element: <ForgetPassword />},
      { path: "/Settings/reset-password", element: <ResetPassword />},
      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    path: '/',
    
    element:
    <LayoutAuth />,
    children: [
      { index: true, element: <Register /> },
      { path: 'signup', element: <Register /> },
      { path: 'signin', element: <Login /> },
      { path: 'otp-verify', element: <OtpVerify />},

      { path: '*', element: <ErrorPage /> },
    ],
  },
]);


const RootComponent = (
  
  <Provider store={Story}>
    <RouterProvider router={routers} />
  </Provider>
);

// Render the RootComponent using createRoot
ReactDOM.createRoot(document.getElementById('root')).render(RootComponent);
