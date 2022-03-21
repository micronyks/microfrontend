import ReactDOM from 'react-dom';
import './index.css';
import { createMemoryHistory, createBrowserHistory } from 'history';

// custom imports
import App from './App';

export function mount(el, { onNavigate, defaultHistory, initialPath, sendNavigationTo, onProfileMenuClickHandler }, isAuthenticated) {

  const navigateTo = (routeTo) => {
    if (sendNavigationTo) {
      sendNavigationTo(routeTo);
    }
  }

  const profileMenuClickHandler = (selectedMenuItem) => {
    if (onProfileMenuClickHandler) {
      onProfileMenuClickHandler(selectedMenuItem);
    }
  }

  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });


  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} 
                        navigateTo={navigateTo} 
                        profileMenuClickHandler={profileMenuClickHandler} 
                        isAuthenticated={isAuthenticated}
  />, el);

  return {
    onParentNavigate(result) {
      console.log('header: onParentNavigate: parent navigated', result.location.pathname);
      const { pathname } = history.location;
      if (pathname !== result.location.pathname) {
        history.push(result.location.pathname);
      }
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  const el = document.getElementById('header_root')
  if (el) {
    mount(el, { defaultHistory: createBrowserHistory() });
  }
}

export default mount;

