import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import './index.css'
import { CookiesProvider } from 'react-cookie'
import { Wrap } from './Provider/Wrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WalletDetail from './page/WalletDetail.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Wrap>
      <CookiesProvider>
        <BrowserRouter>
          <Routes >
            <Route index element={<App />} />
            <Route path="/:id" element={<WalletDetail />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </Wrap>
  </StrictMode>,
)
