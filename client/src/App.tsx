import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import AdminHome from "./pages/AdminHome";
import AdminSignin from "./pages/AdminSignin";
import Create from "./components/Create";
import Update from "./components/Update";
import PrivateAdminRoute from "./components/PrivateAdminRoute";

/*import Username from "./components/Username";
import Reigster from "./components/Reigster";
import Password from "./components/Password";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import PageNotFound from "./components/PageNotFound";*/

/*const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/register',
    element:<Signup/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/about',
    element:<About/>
  },


  {
    path:'*',
    element:<PageNotFound/>
  }
])
*/
function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<About/>}/>
        <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route path="/admin" element={<AdminSignin/>}/>
        <Route path="/admin/home" element={<AdminHome/>}/>
        <Route element={<PrivateAdminRoute/>}>
        <Route path ="/admin/create" element={<Create/>}/>
        <Route path="/admin/update/:id" element={<Update/>}/>
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      {/*<RouterProvider router={router}></RouterProvider>*/}
      </BrowserRouter>
  )
}

export default App;
