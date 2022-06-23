import mount from 'auth/AuthApp';
import React, { useRef, useEffect, useContext } from 'react';
import { UNSAFE_NavigationContext, useLocation, useNavigate } from 'react-router-dom';


const AuthApp = (props) => {
  console.log('AuthApp props', props);
  console.log('####', process.env.NODE_ENV);
  console.log('####', process.env.REACT_APP_API_ENDPOINT)
  console.log('####', process.env.REACT_APP_MYNAME)

  const ref = useRef(null);
  const { navigator } =   zuseContext(UNSAFE_NavigationContext); // the browser history object  
  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: location.pathname,
      onNavigate: (result) => {
        const { pathname } = location;
        if (pathname !== result.location.pathname) {
          navigator.push(result.location.pathname);
        }
      },
      onAuthChange: (isAuthenticated) => {
        props.onAuthChange(isAuthenticated);
      },
      sendNavigationTo: (navigateTo) => {
        const pathname = location.pathname;
        if (pathname !== navigateTo) {
          navigation(navigateTo);
        }
      },
    },
      props.selectedMenuItem
    )
    const unlisten = navigator.listen(onParentNavigate);

    return unlisten; // <-- cleanup listener on component unmount
  }, []);

  return <div ref={ref}></div>
}

export default AuthApp;

