import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css'
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx'
import { store, persistor } from './store.js';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
