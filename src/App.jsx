import React, { useContext, useEffect, useMemo, useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AuthElement from './Components/AuthLayout/AuthElement';
import Login from './Components/AuthLayout/Login';
import Register from './Components/AuthLayout/Register';
import Reset from './Components/AuthLayout/Reset';
import Forget from './Components/AuthLayout/Forget';
import Verify from './Components/AuthLayout/Verify';
import MasterElement from './Components/MasterLayout/MasterElement';
import Home from './Components/MasterLayout/Home';
import Users from './Components/MasterLayout/Users';
import Resipe from './Components/MasterLayout/Resipe';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { jwtDecode } from 'jwt-decode';
import Protected_root from './Components/Protected_root';
import CategoriseList from './Components/MasterLayout/CategoriseList';
import Add_Update_Resipe from './Components/MasterLayout/Add_Update_Resipe';
import { AuthContext } from './Components/ConteXt';
import NotFound from './Components/NotFound';
import Access_root from './Components/MasterLayout/Access_root';
import Favourits from './Components/MasterLayout/Favourits';
import ChangePass from './Components/ChangePass';

const App = () => {
  const { CurrentUser, funCurrentUser, loading } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const Handle = () => {
    const uncoded = localStorage.getItem('token');
    if (uncoded) {
      try {
        const decoded = jwtDecode(uncoded);
        setData(decoded);
      } catch (error) {
        console.error('Invalid token', error);
        setData(null);
      }
    }
  };

  useEffect(() => {
    Handle();
    funCurrentUser();
   
  }, []);

  const routes = useMemo(() => {
    return createBrowserRouter([
      {
        path: '/',
        element: <AuthElement />,
        children: [
          { index: true, element: <Login /> },
          { path: 'Login', element: <Login /> },
          { path: 'Register', element: <Register /> },
          { path: 'Reset', element: <Reset /> },
          { path: 'Forget', element: <Forget /> },
          { path: 'Veryfi', element: <Verify /> },
          { path: 'change-password', element: <ChangePass /> },
        ],
      },
      {
        path: '/MasterElement',
        errorElement: <NotFound />,
        element: (
          <Protected_root data={data}>
            <MasterElement data={data} />
          </Protected_root>
        ),
        children: [
          { index: true, element: <Home /> },
          {
            path: 'Fav',
            element:
              CurrentUser === 'SystemUser' ? (
                <Favourits />
              ) : (
                <Navigate to="/MasterElement/Home" replace />
              ),
          },
          { path: 'Home', element: <Home /> },
          { path: 'NotFound', element: <NotFound /> },
          {
            path: 'Users',
            element: (
              <Access_root>
                <Users />
              </Access_root>
            ),
          },
          { path: 'Resipe', element: <Resipe /> },
          {
            path: 'CategoriseList',
            element: (
              <Access_root>
                <CategoriseList />
              </Access_root>
            ),
          },
          {
            path: 'Add_Update_Resipe',
            element: (
              <Access_root>
                <Add_Update_Resipe />
              </Access_root>
            ),
          },
          {
            path: 'Add_Update_Resipe/update/:id',
            element: (
              <Access_root>
                <Add_Update_Resipe />
              </Access_root>
            ),
          },
          { path: '*', element: <NotFound /> },
        ],
      },
    ]);
  }, [CurrentUser, data]);

  if (loading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div>
      <RouterProvider router={routes} />
      <ToastContainer />
    </div>
  );
};

export default App;