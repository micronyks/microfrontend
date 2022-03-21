import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { Routes, Route, Navigate, Router } from 'react-router-dom';
import './App.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import authStore, { authActions, AuthState } from './core/store/auth.store';


// custom imports
import LoginComponent from './components/login.component';
import ForgetPasswordComponent from './components/forget-password.component';
import { HEADER } from './core/constants/header.constant';

const App: React.FC<{ history: any, isLoggedIn: (isAuthenticated: boolean) => void, selectedMenuItem: string }> = (props) => {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: AuthState) => state?.auth?.isAuthenticated);
  const [selectedMenuItem, setSelectedMenuItem] = useState(props.selectedMenuItem);

  useEffect(() => {
    // logout when already logged in and logout button is clicked
    if (isAuthenticated && selectedMenuItem === HEADER.LOGOUT) {
      setSelectedMenuItem('');
      dispatch(authActions.logout());
    }

    if (isAuthenticated) {
      props.isLoggedIn(true);
    } else {
      props.isLoggedIn(false);
    }
  }, [isAuthenticated])

  const [state, setState] = useState({
    action: props?.history?.action,
    location: props?.history?.location
  })

  useLayoutEffect(() => props?.history?.listen(setState), [props?.history])

  return (<div>
    <Router {...props} location={state?.location} navigator={props?.history} navigationType={state?.action}>
      <Routes >
        <Route path='/auth/login' element={<LoginComponent />} />
        <Route path='/auth/forgetpassword' element={<ForgetPasswordComponent />} />
        <Route path='/auth' element={<Navigate to='/auth/login' />} />
        <Route path='/' element={<Navigate to='/auth' />} />
      </Routes>
    </Router>
  </div>);
}

export default App;

