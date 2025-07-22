import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'normalize.css'
import './index.css'

import App from './App.jsx'
import DefaultLayout from './layouts/DefaultLayout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DefaultLayout>
      <App />
    </DefaultLayout>
  </StrictMode>,
)
