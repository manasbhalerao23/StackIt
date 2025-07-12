import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './components/context/AuthContext.tsx'
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import { MantineProvider } from '@mantine/core'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <MantineProvider>
        <App />
      </MantineProvider>
    </AuthProvider>
  </StrictMode>,
)
