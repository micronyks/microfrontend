import ReactDOM from 'react-dom';
import './index.css';

// custom imports
import App from './App';

const commonMount = (el: HTMLElement) => {
  ReactDOM.render(
    <App />,
    el
  );
}

//if (process.env.NODE_ENV === 'development') {
  const el = document.getElementById('common_root')
  if (el) {
    commonMount(el);
  }
//}

export default commonMount;
