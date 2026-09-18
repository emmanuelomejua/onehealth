import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Topbar from "../components/Topbar";
import { AccessPermissions, AuditLogs, Hospitals, HospitalStaffPage, LoginPage, Overview, Records, RegistrationPage } from "../pages";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";


function AppLayout() {
  return (
    <main className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex flex-1 items-center justify-center w-full mx-auto max-w-[1400px] bg-white">
        <div className="flex">
          <Sidebar />
          <div className="flex flex-col flex-1 w-full bg-black">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
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
      {
      path: '/records',
      element: <Records/>
      },
      {
      path: '/access-permissions',
      element: <AccessPermissions/>
      },
      {
      path: '/audit-logs',
      element: <AuditLogs/>
      },
      {
      path: '/hospitals',
      element: <Hospitals/>
      },
      {
      path: '/hospitals/:id',
      element: <HospitalStaffPage/>
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
