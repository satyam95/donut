import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Toaster } from './components';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster position='bottom-right' visibleToasts={3} />
  </StrictMode>
);
