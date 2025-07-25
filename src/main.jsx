import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'normalize.css';
import './index.css';

import App from './App.jsx';
import DefaultLayout from './layouts/DefaultLayout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DefaultLayout>
        <App />
      </DefaultLayout>
    </BrowserRouter>
  </StrictMode>
);
