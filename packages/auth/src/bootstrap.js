import ReactDOM from 'react-dom';
import './index.css';
import { createMemoryHistory, createBrowserHistory } from 'history';
import { Provider, useSelector } from 'react-redux';
import authStore from './core/store/auth.store';

// custom imports
import App from './App';

const mount = (el, { onNavigate, defaultHistory, initialPath, onAuthChange }, selectedMenuItem) => {


  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });

  const isLoggedIn = (isAuthenticated) => {
    if (onAuthChange) {
      onAuthChange(isAuthenticated);
    }
  }

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(
    <Provider store={authStore}>
      <App history={history} isLoggedIn={isLoggedIn} selectedMenuItem={selectedMenuItem}/>
    </Provider>,
    el);

  return {
    onParentNavigate(result) {
      console.log('auth: onParentNavigate: parent navigated', result.location.pathname);
      const { pathname } = history.location;
      if (pathname !== result.location.pathname) {
        history.push(result.location.pathname);
      }
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  const el = document.getElementById('auth_root')
  if (el) {
    mount(el, { defaultHistory: createBrowserHistory() });
  }
}

export default mount;

