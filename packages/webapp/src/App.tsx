import React, { Fragment, Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

import ErrorBoundary from "./components/error-boundary.component";

// const HeaderApp = React.lazy(() => import("./components/headerapp"));
import HeaderApp from "./components/headerapp";
import Loader from "./components/loader";
import SelectionComponent from "./components/selection.component";
import { HEADER } from "./core/constants/header.constant";
import { NAVIGATION } from "./core/constants/navigation.constant";
import { WIDEUI_AUTH_STORAGE } from "./core/constants/storage.constant";
const AuthApp = React.lazy(() => import("./components/authapp"));
const DashboardApp = React.lazy(() => import("./components/dashboardapp"));

// import NotificationModule from "common/NotificationModule";

const notification = {
  title: 'first notificationn',
  description: 'My First ever notification created !',
  color: 'red'
}

const App: React.FC = () => {
  let localStorageData: any = null;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

    if (localStorage.getItem('storage_auth')) {
      localStorageData = JSON.parse(localStorage?.getItem('storage_auth') || '');
    } else {
      navigate(NAVIGATION.LOGIN);
    }

    if (isAuthenticated || localStorageData?.isAuthenticated) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  const onProfileMenuClickHandler = async (value: string) => {
    if (value === HEADER.PROFILE.LOGOUT) {
      const auth = { isAuthenticated: false };
      localStorage.setItem(WIDEUI_AUTH_STORAGE, JSON.stringify(auth));
      navigate(NAVIGATION.LOGOUT);
      setSelectedMenuItem(value);
    }
  }

  return (<Fragment>

    <header className="webapp-header">
      <ErrorBoundary>
        <HeaderApp
          onProfileMenuClickHandler={onProfileMenuClickHandler}
          isAuthenticated={isAuthenticated}
        />
      </ErrorBoundary>
    </header>

    {/* <NotificationModule notification={notification} /> */}

    <Suspense fallback={<Loader />}>
      <section className='webapp-viewport'>
        <ErrorBoundary>
          <Routes>
            <Route
              path='/auth/*'
              element={
                <AuthApp
                  onAuthChange={setIsAuthenticated}
                  selectedMenuItem={selectedMenuItem}
                />
              } />

            <Route path='/dashboard/*' element={<DashboardApp />} />

            <Route path='/selection' element={<SelectionComponent />} />

            <Route path='/' element={<Navigate to='/auth/login' />} />
          </Routes>
        </ErrorBoundary>
      </section>
      <footer className="webapp-footer"><b>@All right reserved!</b></footer>
    </Suspense>

  </Fragment >)
}

export default App;