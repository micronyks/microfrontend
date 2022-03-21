import ReactDOM from 'react-dom';
import './index.css';
import { createMemoryHistory, createBrowserHistory } from 'history';

// custom imports
import App from './App';


export function mount(el, { onNavigate, defaultHistory, initialPath }) {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });
  console.log('dash: mount: history', history);
  if (onNavigate) {
    history.listen(onNavigate);
  }
  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate(result) {
      console.log('dash: onParentNavigate: parent navigated', result.location.pathname);
      const { pathname } = history.location;
      if (pathname !== result.location.pathname) {
        history.push(result.location.pathname);
      }
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  const el = document.getElementById('dashboard_root')
  if (el) {
    mount(el, { defaultHistory: createBrowserHistory() });
  }
}

export default mount;

