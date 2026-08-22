import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './styles/foundation.css';
import './styles/historical.css';
import './styles/secondInternet.css';
import './styles/trace.css';
import './styles/graph.css';
import './styles/crt.css';
import './styles/livingArchive.css';
import './styles/institutionalRoutes.css';
import './styles/workbenchRoutes.css';
import './styles/humanArchiveRoutes.css';
import { ArchiveErrorBoundary } from './components/common/ArchiveErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ArchiveErrorBoundary>
      <App />
    </ArchiveErrorBoundary>
  </React.StrictMode>
);

if ('serviceWorker' in navigator && !['localhost', '127.0.0.1'].includes(window.location.hostname)) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(error => {
      console.warn('Archive offline worker registration failed', error);
    });
  });
}
