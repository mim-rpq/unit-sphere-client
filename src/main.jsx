import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Router/Router.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'

import 'aos/dist/aos.css';
import Aos from 'aos'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


Aos.init()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className=''>
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>,
)
