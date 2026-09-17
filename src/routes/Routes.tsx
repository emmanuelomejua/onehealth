import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Topbar from "../components/Topbar";
import { LoginPage, Overview, RegistrationPage } from "../pages";


function AppLayout(){
  return(
    <main className="">
        <Topbar/>
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-white">
        <Outlet/>
        </div>
    </main>
  )
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    children: [
      {
      path: '/',
      element: <Overview/>
      },
    ]
  },
  {
    path: '/sign-in',
    element: <LoginPage/>
  },
  {
    path: '/sign-up',
    element: <RegistrationPage/>
  },
])

const Routes = () => {

    
  return (
    <RouterProvider router={router} />
  )
}

export default Routes;
