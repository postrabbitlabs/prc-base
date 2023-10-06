import 'antd/dist/reset.css';
import './i18n.ts';

import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <App />
  </HashRouter>,
);